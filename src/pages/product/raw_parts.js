import React, { useState } from "react";
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
import { ADMIN, STORE_KEEPER } from "../..";
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

export default function RawParts({ view, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "part_id",
    "part_name",
    "material",
    "image",
    "quantity",
  ];
  const __put_data__ = ["part_name", "image", "quantity"];

  const [materials, setMaterials] = useState([]);
  const [material_representation, setMaterialRepresentation] = useState({});
  const [allocation_units, setAllocationUnits] = useState({});

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "part_id", header: "Part ID", type: "text" },
    { id: "part_name", header: "Part Name", type: "text" },
    {
      id: "material",
      header: "Material",
      type: "text",
      representation: material_representation,
    },
    { id: "quantity", header: "Quantity", type: "number" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "product/part/raw/" });
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
    { "generate_id/RPC/": setId },
    {
      [router.GET]: setRows,
      "stores/material/choices/": setMaterials,
      "stores/material/representation/": setMaterialRepresentation,
      "stores/material/units/allocation/representation/": setAllocationUnits,
    }
  )();

  return (
    <>
      {view != STORE_KEEPER && (
        <PageInfo name={"Raw Parts"} path={[{ name: "Parts" }]} />
      )}
      <Table
        height="70vh"
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.part_id}
      />

      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Content"}
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
          elementId="part_id"
          elementLabel="Part ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="part_name"
          elementLabel="Part Name"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          noAlter={true}
          representation={material_representation}
          elementId="material"
          elementLabel="Material"
          options={materials}
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          noAlter={true}
          prefix={`${allocation_units[state.formContent["material"]] ?? "Units"}`}
          elementId="quantity"
          elementLabel="Quantity"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        <ImageUpload
          elementLabel={"Part Image"}
          buttonText={"Part Image"}
          style={{ height: "15vw", width: "30vw" }}
          elementId="image"
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
