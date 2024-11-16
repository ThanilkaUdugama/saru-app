import { useState } from "react";
import Profile from "../../icons/profile";
import AnalyticsView1 from "../analytics/analytics_view_1";

export default function SalesBatchDashboard({ view, setPath }) {
  const columns = [
    {
      field: "delivery_id",
      headerName: "Delivery Batch",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gate_pass_number",
      headerName: "Gate Pass Number",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "product__product_name",
      headerName: "Product",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "delivery__delivered_by__profile",
      headerName: "Assigned To",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => <Profile src={"/media/" + param.value} />,
    },
    {
      field: "delivery__delivered_by__name",
      headerName: "Assigned To (Name)",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "number_of_items",
      headerName: "Number of Items",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
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
      renderCell: (param) => param.value,
    },
  ];
  return (
    <div>
      <AnalyticsView1
        baseURL={`${process.env.REACT_APP_API}/sales/sales_batch/`}
        columns={columns}
        title={"Products Dispatch"}
        unique_value="gate_pass_number"
        GT1="bar"
        GT2="bar"
      />
    </div>
  );
}
