import { CREATE } from "../classes/form_fields";
import TrueIcon from "../icons/true";
import FalseIcon from "../icons/false";
import Profile from "../icons/profile";
import ColorRing from "../icons/color_ring";
import MulticolorRing from "../icons/multicolor_ring";
import { colors_hex } from "./data";
import { useState, useEffect } from "react";
import { requestWrapper, setChoices } from "../fns";

export function setPageState() {
  return () =>
    useState({
      formOpen: false,
      formContent: {},
      formStatus: CREATE,
      rows: [],
    });
}

export function getActions(state, setState, id_field) {
  const addButtonClick = () => {
    setState((state) => {
      return { ...state, formStatus: CREATE, formContent: {}, formOpen: true };
    });
  };

  const setFormState = (value) => {
    setState((state) => {
      return { ...state, ...value };
    });
  };

  const setFormContentState = (value) => {
    setState((state) => {
      return { ...state, formContent: { ...state.formContent, ...value } };
    });
  };

  const setRows = (data) => {
    setFormState({ rows: data });
  };

  const setId = (data) => {
    if (state.formStatus == CREATE)
      setFormContentState({ [id_field]: data.id });
  };

  return [addButtonClick, setFormState, setFormContentState, setRows, setId];
}

export function setTriggers(state, setPath, Autocomplete, Actions) {
  return () => {
    if (Autocomplete) {
      useEffect(() => {
        for (const [path, setFunc] of Object.entries(Autocomplete)) {
          requestWrapper(
            () => setChoices(`${process.env.REACT_APP_API}/${path}`, setFunc),
            setPath
          );
        }
      }, [state.formOpen]);
    }

    useEffect(() => {
      for (const [path, setFunc] of Object.entries(Actions)) {
        requestWrapper(
          () => setChoices(`${process.env.REACT_APP_API}/${path}`, setFunc),
          setPath
        );
      }
    }, []);
  };
}

export function getColumns(data) {
  return data.map((item) => {
    const id = item["id"];
    const header = item["header"];
    const type = item["type"];
    const prefix = item["prefix"];
    const suffix = item["suffix"];
    const minWidth = item["minWidth"];
    const decimals = item["decimals"];
    const representation = item["representation"];

    switch (type) {
      case "number":
      case "text":
      case "date":
      case "time":
        return {
          field: id,
          headerName: header,
          type: 'text',
          flex: 1,
          minWidth: minWidth ?? 150,
          align: "center",
          headerAlign: "center",
          renderCell:
            suffix || prefix
              ? (param) =>
                  suffix
                    ? `${param.value} ${suffix}`
                    : `${prefix} ${decimals ? param.value.toFixed(decimals) : param.value}`
              : representation
                ? (param) => representation[param.value]
                : null,
        };
      case "boolean":
        return {
          field: id,
          headerName: header,
          type: type,
          flex: 1,
          minWidth: minWidth ?? 150,
          align: "center",
          headerAlign: "center",
          renderCell: (param) => (param.value ? <TrueIcon /> : <FalseIcon />),
        };
      case "profile":
        return {
          field: id,
          headerName: header,
          flex: 1,
          align: "center",
          minWidth: minWidth ?? 150,
          headerAlign: "center",
          renderCell: (param) => <Profile src={param.value} />,
        };
      case "color":
        return {
          field: id,
          headerName: header,
          flex: 1,
          align: "center",
          minWidth: minWidth ?? 150,
          headerAlign: "center",
          renderCell: (param) =>
            param.value == 0 ? (
              <MulticolorRing />
            ) : (
              <ColorRing color={colors_hex[param.value]} />
            ),
        };
    }
  });
}

export function getRequestRouters(routes) {
  return {
    GET: routes["GET"],
    POST: routes["POST"] ?? routes["GET"],
    DELETE: routes["DELETE"] ?? routes["GET"],
    PUT: routes["PUT"] ?? routes["GET"],
  };
}

export function getMutableFields(permitted, fields) {
  return permitted ? fields : [];
}

export function getMethods(view, permissions) {
  return {
    create: permissions.create.includes(view),
    update: permissions.update.includes(view),
    delete: permissions.delete.includes(view),
  };
}
