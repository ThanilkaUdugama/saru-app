import React, { useState } from "react";
import { STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import {
  ChooseFormField,
  DateFormField,
  NumberFormField,
  ProfileFormField,
  TextFormField,
  TimeFormField
} from "../../classes/form_fields";
import Table from "../../classes/table";
import { CustomContainer } from "../../components/containers";
import EntryAddButton from "../../components/entry_add_button";
import PageInfo from "../../components/page_info";
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";

export default function ReturnBatchPage({ view, setPath }) {
  const [state, setState] = setPageState()();
  const [employee, setEmployee] = useState([]);
  const [batches, setBatches] = useState([]);
  const __post_data__ = [
    "return_id",
    "return_batch",
    "return_items",
    "date",
    "time",
    "returned_by",
  ];
  const __put_data__ = [];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "return_id", header: "Return ID", type: "text" },
    { id: "return_batch", header: "Gatepass Number", type: "text" },
    { id: "return_items", header: "Return Items", type: "number" },
    { id: "date", header: "Date", type: "date" },
    { id: "time", header: "Time", type: "time" },
    { id: "returned_by_image", header: "Return By", type: "profile" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "sales/return/" });
  const methods = getMethods(view, {
    create: [STORE_KEEPER],
    update: [],
    delete: [STORE_KEEPER],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    {},
    {
      [router.GET]: setRows,
      "sales/sales_batch/choices/all/": setBatches,
      "hr/employee/choices/1/": setEmployee,
    }
  )();

  return (
    <CustomContainer>
      <PageInfo name={"Return Batch"} path={[{ name: "Sales" }]} />
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.return_id}
      />
      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Return Batch"}
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
          elementId="return_id"
          elementLabel="Return ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          noAlter={true}
          elementId="return_batch"
          elementLabel="Sale Batch"
          options={batches}
          formState={state}
          setFormState={setFormContentState}
          onChange={(value) =>
            value
              ? fetch(
                  `http://localhost:8000/sales/sales_batch/return_count/${value}/`
                )
                  .then((res) => res.json())
                  .then((data) => setFormContentState({ text: data }))
              : null
          }
        />
        <NumberFormField
          noAlter={true}
          elementId="return_items"
          elementLabel="Return Number of Items"
          formState={state}
          setFormState={setFormContentState}
        />
        {/* <Text parentId = {'return_batch'} icon = {<CrisisAlertIcon sx = {{color : '#757575', height : '0.9rem', marginRight : '0.1rem'}} />} elementId="text" elementLabel = "Text" formState = {state} setFormState = {setFormContentState}/> */}
        <DateFormField
          elementId="date"
          elementLabel="Date"
          formState={state}
          setFormState={setFormContentState}
        />
        <TimeFormField
          elementId="time"
          elementLabel="Time"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          noAlter={true}
          prefix="EMP ID"
          elementId="returned_by"
          elementLabel="Returned By"
          options={employee}
          formState={state}
          setFormState={setFormContentState}
        />
        <ProfileFormField
          elementId="returned_by"
          elementLabel="Return BY (User Profile)"
          formState={state}
          setFormState={setFormContentState}
        />
        <ProfileFormField
          elementId="record_by"
          elementLabel="Record BY (User Profile)"
          formState={state}
          setFormState={setFormContentState}
        />
      </Form>
      {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
    </CustomContainer>
  );
}
