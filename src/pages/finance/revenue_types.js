import React from "react";
import { ACCOUNTANT } from "../..";
import { Form } from "../../classes/form";
import { TextFormField } from "../../classes/form_fields";
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

export default function RevenueTypesPage({ view, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = ["rev_cat_id", "description"];
  const __put_data__ = ["description"];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "rev_cat_id", header: "Revenue ID", type: "text" },
    { id: "description", header: "Description", type: "text" },
  ]);

  const router = getRequestRouters({ GET: "finance/revenuecategory/" });
  const methods = getMethods(view, {
    create: [ACCOUNTANT],
    update: [ACCOUNTANT],
    delete: [ACCOUNTANT],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    {},
    { [router.GET]: setRows }
  )();

  return (
    <>
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.rev_cat_id}
      />
      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Revenue Category Record"}
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
          elementId="rev_cat_id"
          elementLabel="Revenue ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="description"
          elementLabel="Description"
          formState={state}
          setFormState={setFormContentState}
        />
      </Form>

      {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
    </>
  );
}
