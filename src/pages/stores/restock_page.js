import React, { useState } from "react";
import { STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import {
  ChooseFormField,
  DateFormField,
  ImageUpload,
  NumberFormField,
  ProfileFormField,
  TextFormField
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

export default function RestockPage({ view, setPath }) {
  const __post_data__ = [
    "batch_id",
    "material",
    "quantity",
    "price",
    "date",
    "receipt",
  ];
  const __put_data__ = [];

  const [state, setState] = setPageState()();
  const [materials, setMaterial] = useState([]);
  const [material_representation, setMaterialRepresentation] = useState({});
  const [unit_prices, setUnitPrices] = useState([]);
  const [buyingUnit, setBuyingUnits] = useState({});

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "batch_id", header: "Batch ID", type: "text" },
    {
      id: "material",
      header: "Material",
      type: "text",
      representation: material_representation,
    },
    { id: "quantity", header: "Quantity", type: "number" },
    { id: "price", header: "Price", type: "number" },
    { id: "date", header: "Date", type: "date" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "stores/material/batch/" });
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
    { "generate_id/MTRSTK/": setId },
    {
      [router.GET]: setRows,
      "stores/material/choices/": setMaterial,
      "stores/material/unit_prices/": setUnitPrices,
      "stores/material/representation/": setMaterialRepresentation,
      "stores/material/units/buying/representation/": setBuyingUnits,
    }
  )();

  return (
    <CustomContainer>
      <PageInfo
        name="Materials Restock"
        path={[{ name: "Stores" }, { name: "Materials" }]}
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
        itemName={"Material Restock"}
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
          representation={material_representation}
          noAlter={true}
          elementId="material"
          elementLabel="Material"
          options={materials}
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          prefix={`${buyingUnit[state.formContent["material"]] ?? "Unit"}`}
          parentId={"material"}
          elementId="quantity"
          elementLabel="Quantity"
          min={0}
          formState={state}
          setFormState={setFormContentState}
          onChange={(value) =>
            setFormContentState({
              price: value * unit_prices[state.formContent.material],
            })
          }
        />
        <NumberFormField
          prefix="LKR"
          parentId={"quantity"}
          autoFill={true}
          elementId="price"
          elementLabel="Price"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        <DateFormField
          elementId="date"
          elementLabel="Date"
          formState={state}
          setFormState={setFormContentState}
        />
        <ImageUpload
          elementLabel={"Restock Receipt"}
          buttonText={"Restock Receipt"}
          style={{ height: "15vw", width: "30vw" }}
          elementId="receipt"
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
}
