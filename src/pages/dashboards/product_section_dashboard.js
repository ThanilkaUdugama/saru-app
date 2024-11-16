import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import * as React from "react";

import ProcessPartsDashboard from "./process_parts_dashboard";
import ProductDashboard from "./product_dashboard";

export default function ProductSectionDashboard({ view, setPath }) {
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
            <Tab label="Products" value="1" />
            <Tab label="Processed Parts" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ paddingX: 0 }} value="1">
          <ProductDashboard />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value="2">
          <ProcessPartsDashboard />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
