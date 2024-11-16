import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
import { fontSizes, headingFontSizes } from '../styles';

export default function PageInfo({name, path}){
    return <div>
    <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
    >
        {path.map(({name, func}) => 
        <Typography color="inherit" sx = {{...fontSizes, ':hover': func ? {opacity : 0.7, cursor : 'pointer'} : {}}} onClick = {func} >
        {name}
      </Typography>
    )}
    <Typography key="3" sx={{ color: 'text.primary', ...fontSizes }}>
      {name}
    </Typography>
    </Breadcrumbs>
    <Typography sx ={headingFontSizes} variant="h4" textAlign={'left'} gutterBottom>
        {name}
    </Typography>
    </div>
}