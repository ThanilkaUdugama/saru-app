import React, { useState } from "react";
import {
  CUSTOMER,
  DELIVERY_DRIVER,
  SALESMAN,
  STORE_KEEPER,
  VERIFIER,
} from "../..";
import { Form } from "../../classes/form";
import {
  BooleanFormField,
  ChooseFormField,
  CREATE,
  DateFormField,
  NumberFormField,
  ProfileFormField,
  RETRIEVE,
  TextFormField,
  TimeFormField,
} from "../../classes/form_fields";
import Table from "../../classes/table";
import { CustomContainer } from "../../components/containers";
import EntryAddButton from "../../components/entry_add_button";
import PageInfo from "../../components/page_info";
import {
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
  getActions
} from "../utils";

export default function SalesBatch({
  view,
  deliveryId,
  setSelectedItem,
  setPath,
}) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "gate_pass_number",
    "delivery",
    "product",
    "number_of_items",
  ];
  const __put_data__ = ["verified"];

  const [products, setProducts] = useState([]);
  const [products_representation, setProductRepresentation] = useState({});

  const columns = getColumns([
    { id: "gate_pass_number", header: "Gate Pass Number", type: "text" },
    {
      id: "product",
      header: "Product",
      type: "text",
      representation: products_representation,
    },
    { id: "number_of_items", header: "Number of Items", type: "number" },
    { id: "record_by_image", header: "Allocated By", type: "profile" },
    { id: "allocated_date", header: "Allocated Date", type: "date" },
    { id: "allocated_time", header: "Allocated Time", type: "time" },
    { id: "verified", header: "Verified", type: "boolean" },
    { id: "verified_by_image", header: "Verified By", type: "profile" },
    { id: "verified_date", header: "Verified Date", type: "date" },
    { id: "verified_time", header: "Verified Time", type: "time" },
  ]);

  const router = getRequestRouters({ GET: `sales/sales_batch/${deliveryId}/` });

  const methods = getMethods(view, {
    create: [STORE_KEEPER],
    update: [VERIFIER],
    delete: [STORE_KEEPER],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] = getActions(state, setState, __post_data__[0])

  setTriggers(
    state,
    setState,
    {},
    {
      [router.GET]: setRows,
      "product/choices/": setProducts,
      "product/representation/": setProductRepresentation,
    }
  )();

  return (
    <CustomContainer>
      {view == CUSTOMER ? (
        <PageInfo
          name={deliveryId}
          path={[
            { name: "Customer" },
            { name: "Delivery", func: () => setSelectedItem(null) },
          ]}
        />
      ) : (
        <PageInfo
          name={deliveryId}
          path={[
            { name: "Sales" },
            {
              name: "Delivery",
              func: () => setSelectedItem(null),
              route:
                view == DELIVERY_DRIVER
                  ? "/sales/tocustomer/"
                  : view == SALESMAN
                    ? "/sales/toshop/"
                    : "/sales/delivery/",
            },
          ]}
        />
      )}
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.gate_pass_number}
      />

      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Batch"}
        methods={methods}
        formOpen={state.formOpen}
        postData={post_data}
        putData={put_data}
        router={router}
        state={state}
        setState={setFormState}
      >
        {state.formStatus != CREATE && view == VERIFIER && (
          <BooleanFormField
            noAlter={
              state.formContent["verified"] == true &&
              state.formContent["verified-init"]
            }
            elementId="verified"
            elementLabel="Verified"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        <TextFormField
          noAlter={true}
          elementId="gate_pass_number"
          elementLabel="Gatepass Number"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          hide={true}
          elementId="delivery"
          elementLabel="Delivery"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
          defaultValue={deliveryId}
        />
        <ChooseFormField
          noAlter={true}
          representation={products_representation}
          elementId="product"
          elementLabel="Product"
          options={products}
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          noAlter={true}
          prefix="PCs"
          elementId="number_of_items"
          elementLabel="Number of Items"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        {state.formStatus == RETRIEVE && (
          <DateFormField
            noAlter={true}
            elementId="allocated_date"
            elementLabel="Allocated Date"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <TimeFormField
            noAlter={true}
            elementId="allocated_time"
            elementLabel="Allocated Time"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <ProfileFormField
            elementId="allocated_by"
            elementLabel="Allocated By"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <ProfileFormField
            elementId="verified_by"
            elementLabel="Verified By"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <DateFormField
            elementId="verified_date"
            elementLabel="Verified Date"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <TimeFormField
            elementId="verified_time"
            elementLabel="Verified Time"
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
