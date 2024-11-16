import { Card, CardContent, Typography } from "@mui/material";
import * as React from "react";
import { useTheme } from "@emotion/react";
import { ScreenshotButton } from "../components/download_button";

export function CustomContainer({ children }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: "none",
        padding: 1,
        border: "1px solid",
        borderColor: theme.palette.border.color,
        borderRadius: "8px",
        background: theme.palette.background.paper,
        width: "100%",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        {children}
      </CardContent>
    </Card>
  );
}

export function GraphContainer({
  title,
  subtitle,
  graphTypeController,
  graph,
  paramBoard,
  table,
}) {
  const downloadRef = React.useRef();
  const theme = useTheme();
  return (
    <Card
      ref={downloadRef}
      sx={{
        borderRadius: 0,
        boxShadow: "none",
        border: "1px solid",
        borderColor: theme.palette.border.color,
        borderRadius: "8px",
        background:
          theme.palette.mode == "light"
            ? theme.palette.background.paper
            : "#0d0d0d",
        marginY: 3,
        width: "95%",
      }}
    >
      <div className="flex justify-end -mb-[0.5rem] mr-[1rem] mt-[1rem]">
        <ScreenshotButton Ref={downloadRef} />
      </div>
      <CardContent sx={{ paddingX: "2rem" }}>
        {subtitle && (
          <Typography align="left" variant="body2" color="success.main">
            {subtitle}
          </Typography>
        )}
        <div className="flex justify-between">
          <Typography variant="h4" fontWeight="thin">
            {title}
          </Typography>
        </div>

        <div className="flex xs:justify-center md:justify-end w-[100%]">
          {graphTypeController}
        </div>
        {graph}
        {paramBoard}
        {table}
      </CardContent>
    </Card>
  );
}
