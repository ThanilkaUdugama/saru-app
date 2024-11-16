import { useState } from "react";
import Profile from "../../icons/profile";
import AnalyticsView1 from "../analytics/analytics_view_1";

export default function AssembleDashboard({ view, setPath }) {
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
      field: "expected_number_of_products",
      headerName: "Number of Products",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "return_date",
      headerName: "Return Date",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
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
  ];
  return (
    <div>
      <AnalyticsView1
        baseURL={`${process.env.REACT_APP_API}/production/assemble_batch/`}
        columns={columns}
        title={"Products Production"}
        unique_value="batch_id"
        GT1="bar"
        GT2="bar"
      />
    </div>
  );
}
