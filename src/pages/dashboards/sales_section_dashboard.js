import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import * as React from "react";

import ReturnDashboard from "./return_dashboard";
import SalesBatchDashboard from "./sales_dashboard";
import SoldProductsDashboard from "./sold_products_dashboard";

export default function SalesSectionDashboard({ view, setPath }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            marginX: "1rem",
            paddingY: "0rem !important",
          }}
        >
          <TabList onChange={handleChange}>
            <Tab label="Product Dispatch" value="1" />
            <Tab label="Sold Products" value="2" />
            <Tab label="Returns" value="3" />
          </TabList>
        </Box>
        <TabPanel sx={{ paddingX: 0 }} value="1">
          <SalesBatchDashboard />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value="2">
          <SoldProductsDashboard />
        </TabPanel>

        <TabPanel sx={{ paddingX: 0 }} value="3">
          <ReturnDashboard />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
