import { Stack, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { CustomContainer } from "./containers";
import dayjs from "dayjs";

async function downloadReport(download_url, filename) {
  try {
    const response = await fetch(download_url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.xlsx`);
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
}

export default function ReportItem({ name, url, interval = true }) {
  const currentDate = new Date();

  const oneMonthBefore = new Date();
  oneMonthBefore.setMonth(currentDate.getMonth() - 1);

  const [to, setTo] = useState(dayjs());
  const [from, setFrom] = useState(dayjs().subtract(1, 'month'));

  return (
    <CustomContainer>
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
        spacing={2}
      >
        <Typography>{name}</Typography>
        {interval && (
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "center" }}
            spacing={2}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={from}
                onChange={(e,) => setFrom(e)}
                label="From"
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={to}
                onChange={(e,) => setTo(e)}
                label="To"
                
              />
            </LocalizationProvider>
          </Stack>
        )}
        <Button
          variant="outlined"
          onClick={() =>
            to && from
              ? downloadReport(
                  `${process.env.REACT_APP_API}${url}/${from.year()}/${from.month() + 1}/${from.date()}/to/${to.year()}/${to.month() + 1}/${to.date()}/`, `${name}`
                )
              : !interval
                ? downloadReport(`${process.env.REACT_APP_API}${url}/`, `${name}`)
                : null
          }
        >
          Download
        </Button>
      </Stack>
    </CustomContainer>
  );
}
