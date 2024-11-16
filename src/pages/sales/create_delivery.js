import CustomerDelivery from './create_delivery_to_customer';
import ShopDelivery from './create_delivery_to_shop';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageInfo from '../../components/page_info';
import { CustomContainer } from '../../components/containers';
import { fontSizes } from '../../styles';
import SalesBatch from './sales_batch';
import { useState } from 'react';

export default function CreateDeliveryPage({view, setPath}) {
  const [value, setValue] = React.useState('1');
  const [seletectItem, setSelectedItem] = useState(null)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(seletectItem == null){
  return (
    <CustomContainer>
    <PageInfo name = {"Delivery"} path = {[{name : 'Sales'}]} />
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab sx ={fontSizes} label="Customer Delivery" value="1" />
            <Tab sx ={fontSizes} label="Shop Delivery" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="1">
            <CustomerDelivery setSelectedItem = {setSelectedItem} view = {view} />
        </TabPanel>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="2">
            <ShopDelivery setSelectedItem = {setSelectedItem} view = {view} />
        </TabPanel>
      </TabContext>
    </Box>
    </CustomContainer>
  )}
  else{
    return <SalesBatch setSelectedItem={setSelectedItem} deliveryId={seletectItem} view = {view} />
  }
  
}