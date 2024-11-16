import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button } from '@mui/material';
import html2canvas from 'html2canvas';

export const ScreenshotButton = ({Ref}) =>{
    const handleDownload = async () => {
        const element = Ref.current;
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL('image/jpeg'); 

        
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'downloaded-image.jpg'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return <Button color='success' sx={{ textTransform: "none", paddingX : '1.5rem', backgroundColor : "rgba(0, 255, 0, 0.1)", ":hover" :  {backgroundColor : "rgba(0, 255, 0, 0.2)"} }} onClick={handleDownload} variant="text" startIcon={<FileDownloadOutlinedIcon/>}>
    Download Chart
  </Button>
}

