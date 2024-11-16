import AssembleBatchAccessoryPage from "./assemble_batch_accessory_page";
import AssembleBatchFabricPage from "./assemble_batch_fabric_page";

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageInfo from "../../components/page_info";
import { useParams } from "react-router-dom";
import { CustomContainer } from "../../components/containers";
import { fontSizes } from "../../styles";

export default function AssembleBatch({view, assembleBatchId, setSelectedItem}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <CustomContainer>
    <PageInfo name = {`${assembleBatchId}`} path = {[{name : 'Stores'}, {name : 'Assemble Batches', func : () => setSelectedItem(null)}]} />
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab sx ={fontSizes} label="Processed Parts Content" value="1" />
            <Tab sx ={fontSizes} label="Raw Parts Content" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="1">
            <AssembleBatchFabricPage assembleBatchId = {assembleBatchId} view = {view} />
        </TabPanel>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="2">
            <AssembleBatchAccessoryPage assembleBatchId = {assembleBatchId} view = {view} />
        </TabPanel>
      </TabContext>
    </Box>
    </CustomContainer>
  );
}