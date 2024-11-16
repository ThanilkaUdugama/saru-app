import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import * as React from "react";
import AssembleDashboard from "./assemble_dashboard";
import PartsProcessDashboard from "./parts_process_dashboard";

export default function ProductionSectionDashboard({ view, setPath }) {
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
            <Tab label="Product Parts Production" value="1" />
            <Tab label="Product Production" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ paddingX: 0 }} value="1">
          <PartsProcessDashboard view={view} setPath={setPath} />
        </TabPanel>
        <TabPanel sx={{ paddingX: 0 }} value="2">
          <AssembleDashboard view={view} setPath={setPath} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
