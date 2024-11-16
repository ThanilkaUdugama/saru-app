import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import Profile from "../../icons/profile";
import AnalyticsView1 from "../analytics/analytics_view_1";

export default function PartsProcessDashboard({ view, setPath }) {
  const columns = [
    {
      field: "batch_id",
      headerName: "Batch ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "part__part_name",
      headerName: "Production Part",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "number_of_items",
      headerName: "Number of Items",
      type: "number",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "internal",
      headerName: "Is Internal Batch",
      type: "boolean",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (param) =>
        param.value ? (
          <CheckIcon sx={{ color: "#34C759" }} />
        ) : (
          <ClearIcon sx={{ color: "#FF9800" }} />
        ),
    },
    {
      field: "assigned_to__profile",
      headerName: "Assigned To",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => <Profile src={"/media/" + param.value} />,
    },
    {
      field: "assigned_to__name",
      headerName: "Assigned To (Name)",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "return_date",
      headerName: "Return Date",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
  ];
  return (
    <div>
      <AnalyticsView1
        baseURL={`${process.env.REACT_APP_API}/production/partprocess_batch/`}
        columns={columns}
        title={"Parts Process Production"}
        unique_value="batch_id"
        GT1="bar"
        GT2="bar"
      />
    </div>
  );
}
