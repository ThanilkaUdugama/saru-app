import { useState } from "react";
import AnalyticsView1 from "../analytics/analytics_view_1";

export default function CostDashboard({ view, setPath }) {
  const columns = [
    {
      field: "cost_id",
      headerName: "Cost ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    // { field: 'type', headerName: 'Cost Type', flex: 1, minWidth : 200, align: 'center', headerAlign: 'center', renderCell : (data) => cost_types_representation[data.value]},
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => param.value.split(":").slice(0, 2).join(":"),
    },
    // { field: 'record_by_image', headerName: 'Record By', minWidth : 150, flex: 1, align: 'center', headerAlign: 'center', renderCell : (param) => <Profile src={param.value} />},
  ];
  return (
    <div>
      <AnalyticsView1
        baseURL={`${process.env.REACT_APP_API}/finance/cost/`}
        columns={columns}
        title={"Costs"}
        unique_value="cost_id"
      />
    </div>
  );
}
