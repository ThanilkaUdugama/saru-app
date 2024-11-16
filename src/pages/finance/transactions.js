import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { CustomContainer } from '../../components/containers';
import PageInfo from '../../components/page_info';
import CostPage from './cost';
import RevenuePage from './revenue';

export default function Transactions({view, setPath}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomContainer>
      <PageInfo name = {value == '1' ? 'Cost' : 'Revenue'} path = {[{name : 'Transaction'}]} />
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab label="Cost" value="1" />
            <Tab label="Revenue" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="1">
            <CostPage view={view} setPath={setPath} />
        </TabPanel>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="2">
            <RevenuePage view = {view} setPath={setPath} />
        </TabPanel>
      </TabContext>
    </Box>
    </CustomContainer>
  );
}