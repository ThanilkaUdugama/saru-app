import React, { useState } from "react";
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
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";
import AssembleBatch from "./assemble_batch";

export default function CreateAssembleBatchPage({ view, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "batch_id",
    "release_date",
    "return_date",
    "product",
    "expected_number_of_products",
    "assigned_to",
  ];
  const __put_data__ = ["completed"];
  const [assemble_employee, setAssembleEmployee] = useState([]);
  const [products, setProducts] = useState([]);
  const [products_representation, setProductRepresentation] = useState({});
  const [seletectItem, setSelectedItem] = useState(null);
  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "batch_id", header: "Batch ID", type: "text" },
    {
      id: "product",
      header: "Product",
      type: "text",
      representation: products_representation,
    },
    { id: "completed", header: "Completed", type: "boolean" },
    { id: "release_date", header: "Release Date", type: "date" },
    { id: "return_date", header: "Return Date", type: "date" },
    { id: "assigned_to_image", header: "Assigned To", type: "profile" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "production/assemble_batch/" });
  const methods = getMethods(view, {
    create: [STORE_KEEPER],
    update: [STORE_KEEPER],
    delete: [STORE_KEEPER],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    { "generate_id/AS/": setId },
    {
      [router.GET]: setRows,
      "hr/employee/choices/8/": setAssembleEmployee,
      "product/choices/": setProducts,
      "product/representation/": setProductRepresentation,
    }
  )();

  if (seletectItem == null) {
    return (
      <CustomContainer>
        <PageInfo
          name="Product Production Processes"
          path={[{ name: "Stores" }]}
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
          setPath={setPath}
          setFormContent={setFormContentState}
          id="batch_id"
          setSelectedItem={setSelectedItem}
          itemName={"Assemble Batch"}
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
          <ChooseFormField
            noAlter={true}
            representation={products_representation}
            elementId="product"
            elementLabel="Product"
            options={products}
            formState={state}
            setFormState={setFormContentState}
          />
          <NumberFormField
            noAlter={true}
            elementId="expected_number_of_products"
            elementLabel="Number of Items"
            min={0}
            formState={state}
            setFormState={setFormContentState}
          />
          {state.formStatus != CREATE && (
            <BooleanFormField
              elementId="completed"
              elementLabel="Completed"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
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
          <ChooseFormField
            noAlter={true}
            prefix="EMP ID"
            elementId="assigned_to"
            elementLabel="Assigned To"
            options={assemble_employee}
            formState={state}
            setFormState={setFormContentState}
          />
          <ProfileFormField
            noAlter={true}
            elementId="assigned_to"
            elementLabel="Assigned To (User Profile)"
            formState={state}
            setFormState={setFormContentState}
          />
          <ProfileFormField
            noAlter={true}
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
      <AssembleBatch
        assembleBatchId={seletectItem}
        view={view}
        setSelectedItem={setSelectedItem}
      />
    );
  }
}
