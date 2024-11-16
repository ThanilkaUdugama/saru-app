import { useEffect, useState } from "react";
import { convertToTitleCase, requestWrapper, setChoices } from "../../fns";
import AnalyticsView2 from "../analytics/analytics_view_2";

export default function ProductDashboard({ view, setPath }) {
  const keys = ["storage_capacity", "price"];
  const [data, setData] = useState({});
  const [y, setY] = useState(keys[0]);
  const units = { storage_capacity: "Items", price: "LKR" };
  const columns = [
    {
      field: "product_id",
      headerName: "Product ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "storage_capacity",
      headerName: "Storage",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
      renderCell: (param) => `LKR ${param.value.toFixed(2)}`,
    },
  ];
  useEffect(() => {
    requestWrapper(
      () => setChoices(`${process.env.REACT_APP_API}/product/data/`, setData),
      setPath
    );
  }, []);

  return (
    <div>
      <AnalyticsView2
        unit={units[y]}
        data={data}
        columns={columns}
        title={`Products ${convertToTitleCase(y)}`}
        unique_value="product_id"
        x={"product_name"}
        y={[y]}
        keys={keys}
        setY={setY}
      />
    </div>
  );
}
