import React, { useState } from "react";
import { ACCOUNTANT, SALESMAN, STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import {
  ChooseFormField,
  ImageUpload,
  NumberFormField,
  ProfileFormField,
  TextFormField
} from "../../classes/form_fields";
import Table from "../../classes/table";
import EntryAddButton from "../../components/entry_add_button";
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";

export default function CostPage({ view, setPath }) {
  const [cost_types, setCostTypes] = useState([]);
  const [cost_types_representation, setCostTypesRepresentation] = useState([]);
  const __post_data__ = [
    "cost_id",
    "description",
    "amount",
    "attachment",
    "type",
  ];
  const __put_data__ = [];

  const [state, setState] = setPageState()();
  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);
  const columns = getColumns([
    { id: "cost_id", header: "Cost ID", type: "text" },
    {
      id: "type",
      header: "Cost Type",
      type: "text",
      representation: cost_types_representation,
    },
    { id: "description", header: "Description", type: "text" },
    { id: "amount", header: "Amount", type: "number", toFixed: 2 },
    { id: "date", header: "Date", type: "date" },
    { id: "time", header: "Time", type: "time" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "finance/cost/" });
  const methods = getMethods(view, {
    create: [STORE_KEEPER, SALESMAN, ACCOUNTANT],
    update: [],
    delete: [STORE_KEEPER, SALESMAN, ACCOUNTANT],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    {},
    {
      [router.GET]: setRows,
      "finance/costcategory/choices/": setCostTypes,
      "costcategory/representation/": setCostTypesRepresentation,
    }
  )();

  return (
    <>
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.cost_id}
      />
      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Cost Record"}
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
          elementId="cost_id"
          elementLabel="Cost ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          noAlter={true}
          representation={cost_types_representation}
          elementId="type"
          elementLabel="Cost Category"
          options={cost_types}
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="description"
          elementLabel="Description"
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          prefix="LKR"
          elementId="amount"
          elementLabel="Amount"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        <ImageUpload
          elementLabel={"Attachment"}
          buttonText={"Attachment"}
          style={{ height: "15vw", width: "30vw" }}
          elementId="attachment"
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
    </>
  );
}
