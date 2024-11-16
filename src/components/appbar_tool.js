import { Button } from "@mui/material";
import { signOut } from "../fns";

export default function AppbarTool(){
    return <div>
        <Button variant="contained" onClick={signOut}>Signout</Button>
    </div>
}