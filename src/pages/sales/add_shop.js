import {
  TextFormField,
  NumberFormField,
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
import PageInfo from "../../components/page_info";

import { setChoices, tokenValidityCheck } from "../../fns";
import { SALESMAN } from "../..";
import { CustomContainer } from "../../components/containers";
import {
  getActions,
  getColumns,
  getRequestRouters,
  setPageState,
  setTriggers,
  getMutableFields,
  getMethods,
} from "../utils";

export default function AddShopPage({ view, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "shop_id",
    "shop_name",
    "address",
    "email",
    "phone_number",
  ];
  const __put_data__ = ["shop_name", "address", "phone_number"];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "shop_id", header: "Shop ID", type: "text" },
    { id: "shop_name", header: "Shop Name", type: "text" },
    { id: "address", header: "Address", type: "text" },
    { id: "email", header: "Email", type: "text" },
    { id: "phone_number", header: "Phone Number", type: "text" },
  ]);

  const router = getRequestRouters({ GET: "sales/shop/" });

  const methods = getMethods(view, {
    create: [SALESMAN],
    update: [SALESMAN],
    delete: [SALESMAN],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    { "generate_id/S/": setId },
    { [router.GET]: setRows }
  )();

  return (
    <CustomContainer>
      <PageInfo name={"Shops"} path={[{ name: "Sales" }]} />
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.shop_id}
      />

      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Shop"}
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
          elementId="shop_id"
          elementLabel="Shop ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="shop_name"
          elementLabel="Shop Name"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="address"
          elementLabel="Address"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          noAlter={true}
          elementId="email"
          elementLabel="Email"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="phone_number"
          elementLabel="Phone Number"
          formState={state}
          setFormState={setFormContentState}
        />
      </Form>
      {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
    </CustomContainer>
  );
}
