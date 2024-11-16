import { useEffect, useState } from "react";
import { convertToTitleCase, requestWrapper, setChoices } from "../../fns";
import AnalyticsView2 from "../analytics/analytics_view_2";

export default function ProcessPartsDashboard({ view, setPath }) {
  const keys = ["quantity"];
  const [data, setData] = useState({});
  const [y, setY] = useState(keys[0]);
  const units = { quantity: "Items" };
  const columns = [
    {
      field: "part_id",
      headerName: "Part ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "part_name",
      headerName: "Part Name",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
      renderCell: (param) => `${param.value} PCs`,
    },
  ];

  useEffect(() => {
    requestWrapper(
      () =>
        setChoices(
          `${process.env.REACT_APP_API}/product/part/processed/data/`,
          setData
        ),
      setPath
    );
  }, []);

  return (
    <div>
      <AnalyticsView2
        unit={units[y]}
        data={data}
        columns={columns}
        title={`Fabric Materials ${convertToTitleCase(y)}`}
        unique_value="part_id"
        x={"part_name"}
        y={[y]}
        keys={keys}
        setY={setY}
      />
    </div>
  );
}
