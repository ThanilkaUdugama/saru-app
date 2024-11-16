import React, { useState } from "react";
import { Form } from "../../classes/form";
import {
  BooleanFormField,
  ChooseFormField,
  NumberFormField,
  ProfileFormField,
  TextFormField
} from "../../classes/form_fields";
import Table from "../../classes/table";
import EntryAddButton from "../../components/entry_add_button";

import { STORE_KEEPER } from "../..";
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";

export default function AssembleBatchrawPage({
  view,
  assembleBatchId,
  setPath,
}) {
  const __post_data__ = ["content_id", "part", "allocated"];
  const __put_data__ = ["allocated", "gate_pass_number"];
  const [state, setState] = setPageState()();
  const [parts, setParts] = useState([]);
  const [parts_representation, setPartsRepresentation] = useState({});
  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "content_id", header: "Content ID", type: "text" },
    { id: "allocated", header: "Allocated", type: "boolean" },
    {
      id: "part",
      header: "Part",
      type: "number",
      representation: parts_representation,
    },
    { id: "allocated_quantity", header: "Number of Items", type: "number" },
    { id: "allocated_by_image", header: "Allocated By", type: "profile" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({
    GET: `production/assemble_batch/${assembleBatchId}/raw/`,
  });
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
    {},
    {
      [router.GET]: setRows,
      "product/part/raw/choices/": setParts,
      "product/product/part/raw/parts/": setPartsRepresentation,
    }
  )();

  return (
    <>
      <Table
        height="75vh"
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.content_id}
      />

      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Raw Content"}
        methods={methods}
        formOpen={state.formOpen}
        postData={post_data}
        putData={put_data}
        router={router}
        state={state}
        setState={setFormState}
      >
        <BooleanFormField
          elementId="allocated"
          elementLabel="Allocated"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="gate_pass_number"
          elementLabel="Gatepass Number"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          noAlter={true}
          elementId="content_id"
          elementLabel="Content ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          representation={parts_representation}
          noAlter={true}
          elementId="part"
          elementLabel="raw"
          options={parts}
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          required={false}
          noAlter={true}
          elementId="allocated_quantity"
          elementLabel="Number of Items"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        <ProfileFormField
          noAlter={true}
          elementId="allocated_by"
          elementLabel="Allocated By (User Profile)"
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
    </>
  );
}
