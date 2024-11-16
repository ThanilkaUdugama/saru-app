import React, { useEffect, useState } from "react";
import { STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import {
  BooleanFormField,
  ChooseFormField,
  CREATE,
  DateFormField,
  NumberFormField,
  ProfileFormField,
  TextFormField,
} from "../../classes/form_fields";
import Table from "../../classes/table";
import { CustomContainer } from "../../components/containers";
import EntryAddButton from "../../components/entry_add_button";
import PageInfo from "../../components/page_info";
import { requestWrapper, setChoices } from "../../fns";
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";
import PartsProcessContentPage from "./parts_process_batch_content_page";

export default function PartsProcessPage({ view, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "batch_id",
    "fabric_batch",
    "weight",
    "number_of_items",
    "assigned_to",
    "internal",
    "release_date",
    "return_date",
    "part",
  ];
  const __put_data__ = ["completed"];

  const [parts, setParts] = useState([]);
  const [parts_representation, setPartsRepresentation] = useState({});
  const [ex_employee, setExternalEmployee] = useState([]);
  const [in_employee, setInternalEmployee] = useState([]);

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "batch_id", header: "Batch ID", type: "text" },
    { id: "completed", header: "Completed", type: "boolean" },
    { id: "number_of_items", header: "Number of Items", type: "number" },
    { id: "assigned_to_image", header: "Assigned To", type: "profile" },
    { id: "release_date", header: "Release Date", type: "date" },
    { id: "release_time", header: "Release Time", type: "time" },
    {
      id: "part",
      header: "For",
      type: "text",
      representation: parts_representation,
    },
    { id: "internal", header: "Internal", type: "boolean" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "production/partprocess_batch/" });
  const methods = getMethods(view, {
    create: [STORE_KEEPER],
    update: [STORE_KEEPER],
    delete: [STORE_KEEPER],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  const [seletectItem, setSelectedItem] = useState(null);

  setTriggers(
    state,
    setState,
    { "generate_id/PPB/": setId },
    {
      [router.GET]: setRows,
      "product/part/processed/choices/": setParts,
      "hr/employee/choices/3/": setExternalEmployee,
      "hr/employee/choices/2/": setInternalEmployee,
      "product/part/processed/representation/": setPartsRepresentation,
    }
  )();


  if (seletectItem == null) {
    return (
      <CustomContainer>
        <PageInfo
          name="Product Parts Production"
          path={[{ name: "Production" }]}
        />
        <Table
          setPath={setPath}
          state={state}
          setState={setFormState}
          dataAPI={router.GET}
          columns={columns}
          id_function={(item) => item.batch_id}
        />
        <Form
          setSelectedItem={setSelectedItem}
          id={"batch_id"}
          setPath={setPath}
          setFormContent={setFormContentState}
          itemName={"Part Process"}
          methods={methods}
          formOpen={state.formOpen}
          postData={post_data}
          putData={put_data}
          router={router}
          state={state}
          setState={setFormState}
        >
          <TextFormField
            noAlter={true}
            elementId="batch_id"
            elementLabel="Batch ID"
            prefix="ID"
            formState={state}
            setFormState={setFormContentState}
          />
          {state.formStatus != CREATE && (
            <BooleanFormField
              noAlter={state.formContent["completed-init"] == true}
              elementId="completed"
              elementLabel="Completed"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
          <ChooseFormField
            noAlter={true}
            representation={parts_representation}
            elementId="part"
            elementLabel="Part"
            options={parts}
            formState={state}
            setFormState={setFormContentState}
          />
          <NumberFormField
            parentId={"part"}
            noAlter={true}
            prefix="PCs"
            elementId="number_of_items"
            elementLabel="Number of Items"
            min={0}
            formState={state}
            setFormState={setFormContentState}
          />
          <BooleanFormField
            defaultValue={false}
            noAlter={true}
            elementId="internal"
            elementLabel="Is Internal Cut Batch"
            formState={state}
            setFormState={setFormContentState}
            onChange={() => setFormContentState({ assigned_to: "" })}
          />
          <ChooseFormField
            noAlter={true}
            prefix="EMP ID"
            elementId="assigned_to"
            elementLabel="Assigned To"
            options={state.formContent.internal ? in_employee : ex_employee}
            formState={state}
            setFormState={setFormContentState}
          />
          <ProfileFormField
            elementId="assigned_to"
            elementLabel="Assigned To (User Profile)"
            formState={state}
            setFormState={setFormContentState}
          />
          <DateFormField
            noAlter={true}
            elementId="release_date"
            elementLabel="Release Date"
            formState={state}
            setFormState={setFormContentState}
          />
          <DateFormField
            noAlter={true}
            elementId="return_date"
            elementLabel="Return Date"
            formState={state}
            setFormState={setFormContentState}
          />
          <ProfileFormField
            elementId="record_by"
            elementLabel="Record By"
            formState={state}
            setFormState={setFormContentState}
          />
        </Form>
        {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
      </CustomContainer>
    );
  } else {
    return (
      <PartsProcessContentPage
        view={view}
        setPath={setPath}
        setSelectedItem={setSelectedItem}
        seletectItem={seletectItem}
      />
    );
  }
}
