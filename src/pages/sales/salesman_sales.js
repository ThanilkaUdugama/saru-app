import React, { useEffect, useState } from "react";
import { SALESMAN } from "../..";
import { Form } from "../../classes/form";
import {
  ChooseFormField,
  DateFormField,
  NumberFormField,
  TextFormField,
  TimeFormField,
} from "../../classes/form_fields";
import Table from "../../classes/table";
import { CustomContainer } from "../../components/containers";
import EntryAddButton from "../../components/entry_add_button";
import PageInfo from "../../components/page_info";
import { requestWrapper, setChoices } from "../../fns";
import {
  getActions,
  getColumns,
  getMethods,
  getMutableFields,
  getRequestRouters,
  setPageState,
  setTriggers,
} from "../utils";

export default function SalesmanSales({
  view,
  deliveryId,
  setSelectedItem,
  setPath,
}) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "sale_id",
    "sales_batch",
    "number_of_items_sold",
    "sale_type",
    "revenue",
    "sold_to",
  ];
  const __put_data__ = [];

  const [batches, setBatches] = useState([]);
  const [unit_price, setUnitPrice] = useState(0);
  const [sold_to, setSoldTo] = useState([]);
  const [sold_to_representation, setSoldToRepresentation] = useState({});

  const sale_types = [
    { label: "Credit", value: 1 },
    { label: "Cheque", value: 2 },
  ];
  const sale_types_representation = { 1: "Credit", 2: "Cheque" };

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "sale_id", header: "Sale ID", type: "text" },
    { id: "sales_batch", header: "Sales Batch", type: "text" },
    {
      id: "sale_type",
      header: "Sale Type",
      type: "text",
      representation: sale_types_representation,
    },
    {
      id: "number_of_items_sold",
      header: "Number of Items Sold",
      type: "number",
    },
    { id: "revenue", header: "Revenue", type: "number" },
    { id: "sold_to", header: "Sold To", type: "profile" },
    { id: "sale_date", header: "Sale Date", type: "date" },
    { id: "sale_time", header: "Sale Time", type: "time" },
  ]);

  const router = getRequestRouters({
    GET: `sales/sales-batch-revenue/${deliveryId}/`,
  });
  const methods = getMethods(view, {
    create: [SALESMAN],
    update: [],
    delete: [SALESMAN],
  });

  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  useEffect(() => {
    requestWrapper(() => setChoices(router.GET, setRows), setPath);
    requestWrapper(
      () =>
        setChoices(
          `http://localhost:8000/sales/sales_batch/choices/${deliveryId}/`,
          setBatches
        ),
      setPath
    );
    requestWrapper(
      () => setChoices(`http://localhost:8000/sales/shop/choices/`, setSoldTo),
      setPath
    );
    requestWrapper(
      () =>
        setChoices(
          `http://localhost:8000/sales/shop/representation/`,
          setSoldToRepresentation
        ),
      setPath
    );
  }, []);

  setTriggers(
    state,
    setState,
    { "generate_id/SLR/": setId },
    {
      [router.GET]: setRows,
      [`sales/sales_batch/choices/${deliveryId}/`]: setBatches,
      "sales/shop/choices/": setSoldTo,
      "sales/shop/representation/": setSoldToRepresentation,
    }
  )();

  return (
    <CustomContainer>
      <PageInfo
        name={deliveryId}
        path={[
          { name: "Sales" },
          { name: "Delivery", func: () => setSelectedItem(null) },
        ]}
      />
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.sale_id}
      />

      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"Sale Record"}
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
          elementId="sale_id"
          elementLabel="Sale ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          noAlter={true}
          elementId="sales_batch"
          elementLabel="Product Batch"
          options={batches}
          formState={state}
          setFormState={setFormContentState}
          onChange={(value) =>
            value
              ? requestWrapper(
                  () =>
                    setChoices(
                      `http://localhost:8000/sales/sales_batch/unit_price/${value}/`,
                      setUnitPrice
                    ),
                  setPath
                )
              : null
          }
        />
        <ChooseFormField
          representation={sale_types_representation}
          noAlter={true}
          elementId="sale_type"
          elementLabel="Sale Type"
          options={sale_types}
          formState={state}
          setFormState={setFormContentState}
          onChange={(value) =>
            value
              ? requestWrapper(
                  () =>
                    setChoices(
                      `http://localhost:8000/sales/sales_batch/unit_price/${value}/`,
                      setUnitPrice
                    ),
                  setPath
                )
              : null
          }
        />
        <NumberFormField
          parentId={"sales_batch"}
          noAlter={true}
          elementId="number_of_items_sold"
          elementLabel="Number of Items Sold"
          min={0}
          formState={state}
          setFormState={setFormContentState}
          onChange={(value) =>
            setFormContentState({ revenue: unit_price * value })
          }
        />
        <NumberFormField
          prefix="LKR"
          parentId={"number_of_items_sold"}
          noAlter={true}
          elementId="revenue"
          elementLabel="Revenue"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        <DateFormField
          elementId="sale_date"
          elementLabel="Sold Date"
          formState={state}
          setFormState={setFormContentState}
        />
        <TimeFormField
          elementId="sale_time"
          elementLabel="Sold Time"
          formState={state}
          setFormState={setFormContentState}
        />
        <ChooseFormField
          representation={sold_to_representation}
          noAlter={true}
          elementId="sold_to"
          elementLabel="Sold To"
          options={sold_to}
          formState={state}
          setFormState={setFormContentState}
        />
      </Form>
      {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
    </CustomContainer>
  );
}
