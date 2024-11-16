import {
  TextFormField,
  NumberFormField,
  ProfileFormField,
  ChooseFormField,
  PercentageBeamDisplay,
  Text,
  ImageUpload,
  RadioFormField,
  DateTimeFormField,
  BooleanFormField,
  DateFormField,
  TimeFormField,
} from "../../classes/form_fields";
import React, { useEffect, useState } from "react";
import { Form } from "../../classes/form";
import { Button } from "@mui/material";
import { CREATE } from "../../classes/form_fields";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import Table from "../../classes/table";
import dayjs from "dayjs";
import { SpeedDial } from "@mui/material";
import EntryAddButton from "../../components/entry_add_button";
import { requestWrapper } from "../../fns";

import { setChoices, tokenValidityCheck } from "../../fns";
import { useParams } from "react-router-dom";
import Profile from "../../icons/profile";
import { STORE_KEEPER, ADMIN } from "../..";
import PageInfo from "../../components/page_info";
import {
  getActions,
  getColumns,
  getRequestRouters,
  setPageState,
  setTriggers,
  getMutableFields,
  getMethods,
} from "../utils";

export default function ProcessedPartsContent({
  view,
  partId,
  setPath,
  setSelectedItem,
}) {
  const [state, setState] = setPageState()();
  const [materials, setMaterials] = useState([]);
  const [material_representation, setMaterialRepresentation] = useState({});
  const [allocation_units, setAllocationUnits] = useState({});

  const __post_data__ = ["part_content_id", "quantity", "material", "part"];
  const __put_data__ = ["quantity"];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "part_content_id", header: "Content ID", type: "text" },
    {
      id: "material",
      header: "Material",
      type: "text",
      representation: material_representation,
    },
    { id: "quantity", header: "Quantity", type: "number" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({
    GET: `part/processed/${partId}/content/`,
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
    { "generate_id/PPC/": setId },
    {
      [router.GET]: setRows,
      "stores/material/choices/": setMaterials,
      "stores/material/representation/": setMaterialRepresentation,
      "stores/material/units/allocation/representation/": setAllocationUnits,
    }
  )();

  return (
    <>
      {
        <PageInfo
          name={partId}
          path={[
            { name: "Parts" },
            { name: "Processed Parts", func: () => setSelectedItem(null) },
          ]}
        />
      }
      <Table
        height="70vh"
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.part_content_id}
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
          hide={true}
          elementId="part"
          elementLabel="Part"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
          defaultValue={partId}
        />
        <TextFormField
          noAlter={true}
          elementId="part_content_id"
          elementLabel="Part ID"
          prefix="ID"
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
