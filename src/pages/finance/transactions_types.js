import ProductAccessoryPage from '../product/product_page_raw_parts';
import ProductFabricPage from '../product/product_page_processed_parts';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from 'react-router-dom';
import PageInfo from '../../components/page_info';
import CostPage from './cost';
import RevenuePage from './revenue';
import CostTypesPage from './cost_types';
import RevenueTypesPage from './revenue_types';
import { CustomContainer } from '../../components/containers';
import { fontSizes } from '../../styles';

export default function TransactionTypes({view, setPath}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomContainer>
      <PageInfo name = {value == '1' ? 'Cost Categories' : 'Revenue Categories'} path = {[{name : 'Transaction Types'}]} />
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab sx = {fontSizes} label="Cost Categories" value="1" />
            <Tab sx = {fontSizes} label="Revenue Categories" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="1">
            <CostTypesPage view = {view} />
        </TabPanel>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="2">
            <RevenueTypesPage view={view} />
        </TabPanel>
      </TabContext>
    </Box>
    </CustomContainer>
  );
}