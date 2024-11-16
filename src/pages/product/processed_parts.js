import React, { useEffect, useState } from "react";
import { Form } from "../../classes/form";
import {
  CREATE,
  ImageUpload,
  ProfileFormField,
  TextFormField,
} from "../../classes/form_fields";
import Table from "../../classes/table";
import EntryAddButton from "../../components/entry_add_button";
import { requestWrapper } from "../../fns";

import { useParams } from "react-router-dom";
import { ADMIN, STORE_KEEPER } from "../..";
import PageInfo from "../../components/page_info";
import { setChoices } from "../../fns";
import Profile from "../../icons/profile";
import ProcessedPartsContent from "./processed_parts_content";
import {
  getActions,
  getColumns,
  getRequestRouters,
  setPageState,
  setTriggers,
  getMutableFields,
  getMethods,
} from "../utils";

export default function ProcessedParts({ view, setPath }) {
  const [state, setState] = setPageState()();
  const [seletectItem, setSelectedItem] = useState(null);
  const __post_data__ = [
    "part_id",
    "part_name",
    "material",
    "unit_material_consumption",
    "image",
  ];
  const __put_data__ = ["part_name", "image"];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "part_id", header: "Part ID", type: "text" },
    { id: "part_name", header: "Part Name", type: "text" },
    { id: "quantity", header: "Quantity", type: "number" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "product/part/processed/" });
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
    { "generate_id/PP/": setId },
    { [router.GET]: setRows }
  )();

  if (seletectItem == null) {
    return (
      <div>
        {view != STORE_KEEPER && (
          <PageInfo name={"Processed Parts"} path={[{ name: "Parts" }]} />
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
          setSelectedItem={setSelectedItem}
          id="part_id"
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
      </div>
    );
  } else {
    return (
      <ProcessedPartsContent
        view={view}
        partId={seletectItem}
        setSelectedItem={setSelectedItem}
        setPath={setPath}
      />
    );
  }
}
