import React, { useEffect, useState } from "react";
import Table from "../../classes/table";
import { CustomContainer } from "../../components/containers";
import PageInfo from "../../components/page_info";
import { requestWrapper, setChoices } from "../../fns";
import {
  getActions,
  getColumns,
  getRequestRouters,
  setPageState,
  setTriggers
} from "../utils";
import SalesmanSales from "./salesman_sales";

export default function SalesmanDelivery({ view, setPath }) {
  const [state, setState] = setPageState()();
  const [selectedItem, setSelectedItem] = useState(null);
  const __post_data__ = ["delivery_id", "delivered_by"];
  const __put_data__ = ["departured", "completed"];

  const [addButtonClick, setFormState, setFormContentState, setRows, setId] =
    getActions(state, setState, __post_data__[0]);

  const columns = getColumns([
    { id: "delivery_id", header: "Delivery ID", type: "text" },
    { id: "departured_date", header: "Departured Date", type: "date" },
    { id: "departured_time", header: "Departured Time", type: "time" },
    { id: "completed", header: "Completed", type: "boolean" },
    { id: "delivered_date", header: "Completed Date", type: "date" },
    { id: "delivered_time", header: "Completed Time", type: "time" },
    { id: "record_by_image", header: "Record By", type: "profile" },
  ]);

  const router = getRequestRouters({ GET: "sales/delivery/2/?completed=0&" });

  useEffect(() => {
    requestWrapper(() => setChoices(router.GET, setRows), setPath);
  }, []);

  setTriggers(state, setState, {}, { [router.GET]: setRows })();

  if (selectedItem == null) {
    return (
      <CustomContainer>
        <PageInfo name={"Delivery"} path={[{ name: "Sales" }]} />
        <Table
          onClick={(id) => setSelectedItem(id)}
          state={state}
          setState={setFormState}
          dataAPI={router.GET}
          columns={columns}
          id_function={(item) => item.delivery_id}
        />
      </CustomContainer>
    );
  } else {
    return (
      <SalesmanSales
        setSelectedItem={setSelectedItem}
        deliveryId={selectedItem}
        view={view}
        setPath={setPath}
      />
    );
  }
}
