import React, { useState } from "react";
import { SALESMAN, STORE_KEEPER } from "../..";
import { Form } from "../../classes/form";
import {
  BooleanFormField,
  ChooseFormField,
  CREATE,
  DateFormField,
  ProfileFormField,
  RETRIEVE,
  TextFormField,
  TimeFormField
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
import SalesBatch from "./sales_batch";

export default function ShopDelivery({ view, setSelectedItem, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = ["delivery_id", "delivered_by"];
  const __put_data__ = ["departured", "completed"];

  const [delivery_employee, setDeliveryEmployee] = useState([]);
  const [secondaryselectedItem, secondarysetSelectedItem] = useState(null);

  if (view == SALESMAN) setSelectedItem = secondarysetSelectedItem;

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "delivery_id", header: "Delivery ID", type: "text" },
    { id: "departured", header: "Departured", type: "boolean" },
    { id: "delivered_by_image", header: "Delivered By", type: "profile" },
    { id: "departured_date", header: "Departured Date", type: "date" },
    { id: "departured_time", header: "Departured Time", type: "time" },
    { id: "completed", header: "Completed", type: "boolean" },
    { id: "delivered_date", header: "Delivered Date", type: "date" },
    { id: "delivered_time", header: "Delivered Time", type: "time" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "sales/delivery/2/" });
  const methods = getMethods(view, {
    create: [STORE_KEEPER],
    update: [STORE_KEEPER, SALESMAN],
    delete: [STORE_KEEPER],
  });

  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    { "generate_id/D/": setId },
    {
      [router.GET]: setRows,
      "hr/employee/choices/1/": setDeliveryEmployee,
    }
  )();

  if (view == SALESMAN && secondaryselectedItem != null) {
    return (
      <SalesBatch
        setSelectedItem={setSelectedItem}
        deliveryId={secondaryselectedItem}
        view={view}
      />
    );
  } else if (view == SALESMAN) {
    return (
      <CustomContainer>
        <PageInfo name={"Delivery"} path={[{ name: "Sales" }]} />
        <Table
          height={"75vh"}
          state={state}
          setState={setFormState}
          dataAPI={router.GET}
          columns={columns}
          id_function={(item) => item.delivery_id}
        />

        <Form
          setFormContent={setFormContentState}
          id="delivery_id"
          setSelectedItem={setSelectedItem}
          itemName={"Delivery"}
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
            elementId="delivery_id"
            elementLabel="Delivery ID"
            prefix="ID"
            formState={state}
            setFormState={setFormContentState}
          />
          <ChooseFormField
            noAlter={true}
            prefix="EMP ID"
            elementId="delivered_by"
            elementLabel="Salesman"
            options={delivery_employee}
            formState={state}
            setFormState={setFormContentState}
          />
          <ProfileFormField
            elementId="delivered_by"
            elementLabel="Delivered By (User Profile)"
            formState={state}
            setFormState={setFormContentState}
          />
          {state.formStatus != CREATE && (
            <BooleanFormField
              noAlter={state.formContent["departured-init"]}
              elementId="departured"
              elementLabel="Departured"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
          {state.formStatus == RETRIEVE && (
            <DateFormField
              elementId="departured_date"
              elementLabel="Departured Date"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
          {state.formStatus == RETRIEVE && (
            <TimeFormField
              elementId="departured_time"
              elementLabel="Departured Time"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
          {state.formStatus != CREATE && view == SALESMAN && (
            <BooleanFormField
              noAlter={state.formContent["completed-init"] == true}
              elementId="completed"
              elementLabel="Completed"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
          {state.formStatus == RETRIEVE && (
            <DateFormField
              elementId="delivered_date"
              elementLabel="Completed Date"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
          {state.formStatus == RETRIEVE && (
            <TimeFormField
              elementId="delivered_time"
              elementLabel="Completed Time"
              formState={state}
              setFormState={setFormContentState}
            />
          )}
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

  return (
    <div>
      <Table
        height={"75vh"}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.delivery_id}
      />

      <Form
        setFormContent={setFormContentState}
        id="delivery_id"
        setSelectedItem={setSelectedItem}
        itemName={"Delivery"}
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
          elementId="delivery_id"
          elementLabel="Delivery ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          noAlter={true}
          prefix="EMP ID"
          elementId="delivered_by"
          elementLabel="Salesman"
          options={delivery_employee}
          formState={state}
          setFormState={setFormContentState}
        />
        <ProfileFormField
          elementId="delivered_by"
          elementLabel="Delivered By (User Profile)"
          formState={state}
          setFormState={setFormContentState}
        />
        {state.formStatus != CREATE && (
          <BooleanFormField
            noAlter={state.formContent["departured-init"]}
            elementId="departured"
            elementLabel="Departured"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <DateFormField
            elementId="departured_date"
            elementLabel="Departured Date"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <TimeFormField
            elementId="departured_time"
            elementLabel="Departured Time"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus != CREATE && view == SALESMAN && (
          <BooleanFormField
            noAlter={state.formContent["completed-init"] == true}
            elementId="completed"
            elementLabel="Completed"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <DateFormField
            elementId="delivered_date"
            elementLabel="Completed Date"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <TimeFormField
            elementId="delivered_time"
            elementLabel="Completed Time"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
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
