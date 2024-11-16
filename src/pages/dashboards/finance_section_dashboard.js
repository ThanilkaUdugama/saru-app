import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';

import CostDashboard from './cost_dashboard';
import RevenueDashboard from './revenue_dashboard';

export default function FinanceSectionDashboard({view, setPath}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab label="Costs" value="1" />
            <Tab label="Revenue" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <CostDashboard />
        </TabPanel>
        <TabPanel value="2">
          <RevenueDashboard />
        </TabPanel>
      </TabContext>
    </Box>
 
  );
}