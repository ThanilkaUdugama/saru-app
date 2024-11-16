import { useTheme } from "@emotion/react"
import Chip from '@mui/material/Chip';

export function Logo(){
    const theme = useTheme()
    return <div className="flex items-center">
        <div className="font-medium" style={{color : '#0091ea'}}>Saru</div>
        <div className="pl-[0.2rem] font-medium" style={{color : theme.palette.mode == 'light' ? '#212121' : '#ffffff'}}>Workspace</div>
    </div>
}

export function MainLogo(){
    return <div className="flex items-center">
        <div className="font-medium text-[#0091ea]">Saru</div>
        <div className="pl-[0.2rem] text-[#212121] font-medium">Workspace</div>
    </div>
}