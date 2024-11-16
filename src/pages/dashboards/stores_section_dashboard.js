import { useEffect, useState } from "react";
import { convertToTitleCase, requestWrapper, setChoices } from "../../fns";
import ColorRing from "../../icons/color_ring";
import MulticolorRing from "../../icons/multicolor_ring";
import AnalyticsView2 from "../analytics/analytics_view_2";
import { colors_hex } from "../data";

export default function StoresSectionDashboard({ view, setPath }) {
  const keys = ["quantity", "unit_price"];
  const [data, setData] = useState({});
  const [y, setY] = useState(keys[0]);
  const units = { quantity: "Kg", unit_price: "LKR" };
  const columns = [
    {
      field: "material_id",
      headerName: "Material ID",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => `${param.value} Kg`,
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      align: "center",
      minWidth: 150,
      headerAlign: "center",
      renderCell: (param) =>
        param.value == 0 ? (
          <MulticolorRing />
        ) : (
          <ColorRing color={colors_hex[param.value]} />
        ),
    },
    {
      field: "unit_price",
      headerName: "Unit Price",
      type: "number",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => `LKR ${param.value.toFixed(2)}`,
    },
  ];

  useEffect(() => {
    requestWrapper(
      () =>
        setChoices(
          `${process.env.REACT_APP_API}/stores/material/data/`,
          setData
        ),
      setPath
    );
  }, []);

  return (
    <div className="w-[100vw]">
      <AnalyticsView2
        unit={units[y]}
        data={data}
        columns={columns}
        title={`Materials ${convertToTitleCase(y)}`}
        unique_value="material_id"
        x={"description"}
        y={[y]}
        keys={keys}
        setY={setY}
      />
    </div>
  );
}
