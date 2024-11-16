import FabricParts from './processed_parts';
import AccessoryParts from './raw_parts';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PageInfo from '../../components/page_info';
import { STORE_KEEPER } from '../..';
import { CustomContainer } from '../../components/containers';
import { fontSizes } from '../../styles';

export default function PartsPage({view, setPath}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CustomContainer>
    {(view == STORE_KEEPER) && <PageInfo name = { value == '1' ? "Processed Parts" : "Raw Parts"} path = {[{name : 'Parts'}]} />}
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginX : '1rem', paddingY : '0rem !important' }}>
          <TabList onChange={handleChange}>
            <Tab sx ={fontSizes} label="Processed Parts" value="1" />
            <Tab sx ={fontSizes} label="Raw Parts" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="1">
            <FabricParts view = {view} />
        </TabPanel>
        <TabPanel sx={{paddingX : {xs : 0, md : 2}}} value="2">
            <AccessoryParts view = {view} />
        </TabPanel>
      </TabContext>
    </Box>
    </CustomContainer>
  );
}