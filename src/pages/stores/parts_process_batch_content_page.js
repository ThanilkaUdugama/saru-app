import {
  TextFormField,
  NumberFormField,
  ChooseFormField,
  ProfileFormField,
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
import { Button, Box } from "@mui/material";
import { CREATE, UPDATE, RETRIEVE } from "../../classes/form_fields";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import Table from "../../classes/table";
import dayjs from "dayjs";
import { SpeedDial } from "@mui/material";
import EntryAddButton from "../../components/entry_add_button";
import { requestWrapper } from "../../fns";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { setChoices, tokenValidityCheck } from "../../fns";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Profile from "../../icons/profile";
import TrueIcon from "../../icons/true";
import FalseIcon from "../../icons/false";
import PageInfo from "../../components/page_info";
import { STORE_KEEPER } from "../..";
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

export default function PartsProcessContentPage({
  view,
  seletectItem,
  setPath,
  setSelectedItem,
}) {
  const [state, setState] = setPageState()();
  const [parts_representation, setPartsRepresentation] = useState({});
  const [material_representation, setMaterialRepresentation] = useState({});
  const __post_data__ = ["content_id"];
  const __put_data__ = ["gate_pass_number", "allocated", "quantity"];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = [
    {
      field: "content_id",
      headerName: "Material",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (param) =>
        material_representation[
          parts_representation[param.value.split("_")[1]]
        ],
    },
    {
      field: "gate_pass_number",
      headerName: "Gatepass Number",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "allocated",
      headerName: "Allocated",
      type: "boolean",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => (param.value ? <TrueIcon /> : <FalseIcon />),
    },
    {
      field: "allocated_date",
      headerName: "Allocated Date",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "allocated_time",
      headerName: "Allocated Time",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "allocated_by_image",
      headerName: "Allocated By",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => <Profile src={param.value} />,
    },
  ];
  const router = getRequestRouters({
    GET: `production/partprocess_batch/${seletectItem}/content/`,
  });

  const methods = getMethods(view, {
    create: [],
    update: [STORE_KEEPER],
    delete: [],
  });
  const post_data = getMutableFields(methods.create, __post_data__);
  const put_data = getMutableFields(methods.update, __put_data__);

  setTriggers(
    state,
    setState,
    {},
    {
      [router.GET]: setRows,
      "stores/material/representation/": setMaterialRepresentation,
      "product/part/processed/content/representation/": setPartsRepresentation,
    }
  )();

  useEffect(() => {
    if (state.formStatus == RETRIEVE) {
      setState((state) => ({
        ...state,
        formContent: {
          ...state.formContent,
          material:
            material_representation[
              parts_representation[
                state.formContent["content_id"].split("_")[1]
              ]
            ],
        },
      }));
    }
  }, [state.formContent]);

  return (
    <CustomContainer>
      <PageInfo
        name={seletectItem}
        path={[
          { name: "Production" },
          {
            name: "Product Parts Production",
            func: () => setSelectedItem(null),
          },
        ]}
      />
      <Table
        setPath={setPath}
        state={state}
        setState={setFormState}
        dataAPI={router.GET}
        columns={columns}
        id_function={(item) => item.content_id}
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
          elementId="content_id"
          elementLabel="Content ID"
          prefix="ID"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          noAlter={true}
          elementId="material"
          elementLabel="Material"
          formState={state}
          setFormState={setFormContentState}
        />
        <TextFormField
          elementId="gate_pass_number"
          elementLabel="Gatepass Number"
          formState={state}
          setFormState={setFormContentState}
        />
        <NumberFormField
          prefix="PCs"
          elementId="quantity"
          elementLabel="Quantity"
          min={0}
          formState={state}
          setFormState={setFormContentState}
        />
        {state.formStatus == UPDATE && (
          <BooleanFormField
            elementId="allocated"
            elementLabel="Allocated"
            noAlter={state.formContent["allocated-init"] == true}
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <DateFormField
            elementId="allocated_date"
            elementLabel="Allocated Date"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        {state.formStatus == RETRIEVE && (
          <TimeFormField
            elementId="allocated_time"
            elementLabel="Allocated Time"
            formState={state}
            setFormState={setFormContentState}
          />
        )}
        <ProfileFormField
          elementId="allocated_by"
          elementLabel="Allocated By"
          formState={state}
          setFormState={setFormContentState}
        />
      </Form>
      {methods.create && <EntryAddButton addButtonClick={addButtonClick} />}
    </CustomContainer>
  );
}
