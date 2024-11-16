import { useState } from "react";
import AnalyticsView1 from "../analytics/analytics_view_1";

export default function SalesmanSalesDashboard({ view, setPath }) {
  const columns = [
    {
      field: "sale_id",
      headerName: "Sale ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sales_batch",
      headerName: "Sales Batch",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    // { field: 'sale_type', headerName: 'Sale Type', minWidth : 150, flex: 1, align: 'center', headerAlign: 'center', renderCell : (param) => sale_types_representation[param.value]},
    {
      field: "number_of_items_sold",
      headerName: "Number of Items Sold",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "revenue",
      headerName: "Revenue",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
      renderCell: (param) => param.value,
    },
    {
      field: "sale_date",
      headerName: "Sale Date",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
    },
    {
      field: "sale_time",
      headerName: "Sale Time",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];
  return (
    <div className="w-[86.4vw]">
      <AnalyticsView1
        baseURL={`${process.env.REACT_APP_API}/sales/sales_batch/individual/salesman/10/`}
        columns={columns}
        title={"Salesman Sales"}
        unique_value="gate_pass_number"
        GT1="bar"
        GT2="bar"
      />
    </div>
  );
}
