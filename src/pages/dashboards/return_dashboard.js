import { useState } from "react";
import AnalyticsView1 from "../analytics/analytics_view_1";

export default function ReturnDashboard({ view, setPath }) {
  const columns = [
    {
      field: "return_id",
      headerName: "Return ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "return_batch",
      headerName: "Batch",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Return Date",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "time",
      headerName: "Return Time",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
  ];
  return (
    <div>
      <AnalyticsView1
        baseURL={`${process.env.REACT_APP_API}/sales/return/`}
        columns={columns}
        title={"Returns"}
        unique_value="return_id"
      />
    </div>
  );
}
