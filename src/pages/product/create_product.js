import React, { useState } from "react";
import { ADMIN } from "../..";
import { Form } from "../../classes/form";
import {
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
import ProductPage from "./product_page";

export default function CreateProductPage({ view, setPath }) {
  const __post_data__ = ["product_id", "product_name", "image", "price"];
  const __put_data__ = ["product_name", "image", "price"];

  const [state, setState] = setPageState()();
  const [seletectItem, setSelectedItem] = useState(null);

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "product_id", header: "Product ID", type: "text" },
    { id: "product_name", header: "Product Name", type: "text" },
    { id: "storage_capacity", header: "Storage", type: "number" },
    { id: "price", header: "Price", type: "number" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "product/" });
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
    { "generate_id/P/": setId },
    { [router.GET]: setRows }
  )();

  if (seletectItem == null) {
    return (
      <CustomContainer>
        <PageInfo name={`Products`} path={[{ name: "Product" }]} />
        <Table
          setPath={setPath}
          state={state}
          setState={setFormState}
          dataAPI={router.GET}
          columns={columns}
          id_function={(item) => item.product_id}
        />

        <Form
          setPath={setPath}
          setFormContent={setFormContentState}
          id="product_id"
          setSelectedItem={setSelectedItem}
          itemName={"Product"}
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
            elementId="product_id"
            elementLabel="Product ID"
            prefix="ID"
            formState={state}
            setFormState={setFormContentState}
          />
          <TextFormField
            elementId="product_name"
            elementLabel="Product Name"
            formState={state}
            setFormState={setFormContentState}
          />
          <NumberFormField
            prefix="LKR"
            elementId="price"
            elementLabel="Price"
            min={0}
            formState={state}
            setFormState={setFormContentState}
          />
          <ImageUpload
            elementLabel={"Product Image"}
            buttonText={"Product Image"}
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
      </CustomContainer>
    );
  } else {
    return (
      <ProductPage
        view={view}
        setSelectedItem={setSelectedItem}
        productId={seletectItem}
      />
    );
  }
}
