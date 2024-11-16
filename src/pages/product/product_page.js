import ProductAccessoryPage from './product_page_raw_parts';
import ProductFabricPage from './product_page_processed_parts';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from 'react-router-dom';
import PageInfo from '../../components/page_info';
import { CustomContainer } from '../../components/containers';
import { fontSizes } from '../../styles';

export default function ProductPage({productId, setSelectedItem, view}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomContainer>
    <PageInfo name = {`${productId}`} path = {[{name : 'Product'}, {name : 'Products',  func : () => setSelectedItem(null)}]} />
    <Box sx={{typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab sx = {fontSizes} label="Processed Product Parts" value="1" />
            <Tab sx = {fontSizes} label="Raw Product Parts" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="1">
            <ProductFabricPage productId = {productId} view = {view} />
        </TabPanel>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="2">
            <ProductAccessoryPage productId = {productId} view = {view} />
        </TabPanel>
      </TabContext>
    </Box>
    
    </CustomContainer>
  );
}