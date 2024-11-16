import AddIcon from '@mui/icons-material/Add';
import { SpeedDial } from "@mui/material";

export default function EntryAddButton({addButtonClick}){
    return <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex : 10 }}
        icon={<AddIcon />}
        onClick={addButtonClick}
      ></SpeedDial>
}


