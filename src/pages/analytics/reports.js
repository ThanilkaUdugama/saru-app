import Stack from '@mui/material/Stack';
import ReportItem from '../../components/report_component';

export default function Report({setPath, setSession, view}){
    return <Stack spacing={2} sx={{width : '100%'}}>
        <ReportItem url = '/reports/materials' name ="Materials Report" />
  </Stack>
}