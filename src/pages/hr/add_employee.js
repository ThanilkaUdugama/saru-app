import React, { useState } from "react";
import { ADMIN } from "../..";
import { Form } from "../../classes/form";
import {
  ChooseFormField,
  ImageUpload,
  TextFormField,
} from "../../classes/form_fields";
import Table from "../../classes/table";
import { CustomContainer } from "../../components/containers";
import EntryAddButton from "../../components/entry_add_button";
import PageInfo from "../../components/page_info";
import { getActions, getColumns, getMethods, getRequestRouters, setPageState, setTriggers } from "../utils";

export default function AddEmployeePage({ view, setPath }) {
  const [state, setState] = setPageState()();
  const __post_data__ = [
    "employee_id",
    "name",
    "address",
    "email",
    "phone_number",
    "employee_type",
    "profile",
  ];
  const __put_data__ = [
    "name",
    "address",
    "phone_number",
    "employee_type",
    "profile",
  ];
  const [employee_types, setEmployeeTypes] = useState([]);
  const [employee_types_representation, setEmployeeTypesRepresentation] =
    useState([]);

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "employee_id", header: "Employee ID", type: "text" },
    { id: "name", header: "Name", type: "text" },
    { id: "address", header: "Address", type: "text" },
    { id: "email", header: "Email", type: "text" },
    { id: "phone_number", header: "Phone Number", type: "text" },
    {
      id: "employee_type",
      header: "Employee Type",
      type: "text",
      representation: employee_types_representation,
    },
  ]);

  const router = getRequestRouters({ GET: "hr/employee/" });
  const methods = getMethods(view, {
    create: [ADMIN],
    update: [ADMIN],
    delete: [ADMIN],
  });
  const post_data = [
    "employee_id",
    "name",
    "address",
    "email",
    "phone_number",
    "employee_type",
    "profile",
  ];
  const put_data = [
    "name",
    "address",
    "phone_number",
    "employee_type",
    "profile",
  ];

  setTriggers(
    state,
    setState,
    { "generate_id/EMP/": setId },
    {
      [router.GET]: setRows,
      "hr/employee/types/choices/": setEmployeeTypes,
      "hr/employee/types/representation/": setEmployeeTypesRepresentation,
    }
  )();

  return (
    <CustomContainer>
      <PageInfo name={"Users"} path={[{ name: "Application" }]} />
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.employee_id}
      />

      <Form
        setPath={setPath}
        setFormContent={setFormContentState}
        itemName={"User"}
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
          elementId="employee_id"
          elementLabel="User ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="name"
          elementLabel="User Name"
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
        <ChooseFormField
          noAlter={true}
          representation={employee_types_representation}
          elementId="employee_type"
          elementLabel="User Type"
          options={employee_types}
          formState={state}
          setFormState={setFormContentState}
        />
        <ImageUpload
          elementLabel={"User Profile"}
          buttonText={"User Profile"}
          style={{ height: "15vw", width: "30vw" }}
          elementId="profile"
          formState={state}
          setFormState={setFormContentState}
        />
      </Form>
      {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
    </CustomContainer>
  );
}
