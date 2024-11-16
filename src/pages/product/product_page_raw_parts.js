import React, { useState } from "react";
import { Form } from "../../classes/form";
import {
  ChooseFormField,
  NumberFormField,
  ProfileFormField,
  TextFormField
} from "../../classes/form_fields";
import Table from "../../classes/table";
import EntryAddButton from "../../components/entry_add_button";

import { ADMIN } from "../..";
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";

export default function ProductrawPage({ view, productId, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "product_part_id",
    "product",
    "part",
    "parts_per_product",
    "image",
  ];
  const __put_data__ = [];

  const [accessorty_parts, setRawParts] = useState([]);
  const [accessorty_parts_representation, setRawPartRepresentation] = useState(
    {}
  );

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "product_part_id", header: "Part ID", type: "text" },
    {
      id: "part",
      header: "Part",
      type: "text",
      representation: accessorty_parts_representation,
    },
    { id: "parts_per_product", header: "Parts Per Product", type: "number" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({
    GET: `product/product/part/raw/${productId}/`,
  });
  const methods = getMethods(view, {
    create: [ADMIN],
    update: [ADMIN],
    delete: [ADMIN],
  });

  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    { "generate_id/PRP/": setId },
    {
      [router.GET]: setRows,
      "product/part/raw/choices/": setRawParts,
      "product/part/raw/representation/": setRawPartRepresentation,
    }
  )();

  return (
    <div>
      <Table
        height="70vh"
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.product_part_id}
      />
      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Product Part"}
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
          elementId="product_part_id"
          elementLabel="Product Part ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          hide={true}
          elementId="product"
          elementLabel="Product"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
          defaultValue={productId}
        />
        <ChooseFormField
          noAlter={true}
          representation={accessorty_parts_representation}
          elementId="part"
          elementLabel="Raw Part"
          options={accessorty_parts}
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          noAlter={true}
          prefix="PCs"
          elementId="parts_per_product"
          elementLabel="Parts Per Product"
          min={0}
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
    </div>
  );
}
