import {
  Autocomplete,
  Card,
  CardContent,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import * as React from "react";
import { convertToTitleCase, setChoices } from "../fns";
import { useTheme } from "@emotion/react";
import { Container } from "@mui/material";
import { requestWrapper } from "../fns";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

export function TimelineControlBoard({
  setData,
  type,
  setTitle,
  setPath,
  data,
  baseURL,
  checkBoxes = true,
  dateOnly = false,
  setParam,
  param,
}) {
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const theme = useTheme();

  const [VALUE, setType] = React.useState(0);
  const [date1, setDate1] = React.useState(oneMonthAgo);
  const [date2, setDate2] = React.useState(currentDate);
  const repr = {
    0: ["year", "month", "day"],
    1: ["year", "month"],
    2: ["year"],
  };

  React.useEffect(() => {
    setTitle(
      `${date1.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} - ${date2.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} `
    );
    requestWrapper(
      () =>
        setChoices(
          `${baseURL}d/timeline/${formatDate(oneMonthAgo)}/to/${formatDate(currentDate)}/`,
          setData
        ),
      setPath
    );
  }, []);

  if (data.keys && setParam) {
    if (!param) setParam(data.keys[0]);
  }

  return (
    <div>
      <Container>
        <div className="flex w-[100%] justify-center items-center">
          {!dateOnly && (
            <FormControl sx={{ marginX: "1rem", width: "20vw" }}>
              <InputLabel id="demo-simple-select-label" sx={{ height: "2rem" }}>
                Record By
              </InputLabel>
              <Select
                value={VALUE}
                label="Record By"
                sx={{ paddingX: "1rem" }}
                onChange={(event) => {
                  setDate1(null);
                  setDate2(null);
                  setType(event.target.value);
                }}
              >
                <MenuItem value={0}>Date</MenuItem>
                <MenuItem value={1}>Month</MenuItem>
                <MenuItem value={2}>Year</MenuItem>
              </Select>
            </FormControl>
          )}

          {checkBoxes && type != 4 && (
            <Autocomplete
              value={param ? { label: param, value: param } : null}
              label="Item"
              options={(data.keys ?? []).map((key) => ({
                label: key,
                value: key,
              }))}
              sx={{ paddingX: "1rem", width: "20vw" }}
              onChange={(event, val) => {
                setParam(val ? val.value : null);
              }}
              renderInput={(params) => <TextField {...params} label="Item" />}
            />
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                marginRight: "1rem",
                width: "20vw",
                "& .MuiInputLabel-root": {
                  height: "2rem",
                },
                "& input": {
                  height: "2rem",
                },
              }}
              label="From"
              value={dayjs(date1)}
              onChange={(value) => {
                const d1 = value.format("YYYY-MM-DD").split("-");
                setDate1(new Date(d1[0], d1[1] - 1, d1[2]));
                if (date2) {
                  const d2 = dayjs(date2).format("YYYY-MM-DD").split("-");
                  switch (VALUE) {
                    case 0:
                      requestWrapper(
                        () =>
                          setChoices(
                            `${baseURL}d/timeline/${d1[0]}/${d1[1]}/${d1[2]}/to/${d2[0]}/${d2[1]}/${d2[2]}/`,
                            setData
                          ),
                        setPath
                      );
                      setTitle(
                        `${new Date(d1[0], d1[1] - 1, d1[2]).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} - ${date2.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} `
                      );
                      break;
                    case 1:
                      requestWrapper(
                        () =>
                          setChoices(
                            `${baseURL}m/timeline/${d1[0]}/${d1[1]}/1/to/${d2[0]}/${d2[1]}/31/`,
                            setData
                          ),
                        setPath
                      );
                      setTitle(
                        `${new Date(d1[0], d1[1] - 1, d1[2]).toLocaleString("en-US", { year: "numeric", month: "short" }).toUpperCase()} - ${date2.toLocaleString("en-US", { year: "numeric", month: "short" }).toUpperCase()} `
                      );
                      break;
                    case 2:
                      requestWrapper(
                        () =>
                          setChoices(
                            `${baseURL}y/timeline/${d1[0]}/01/01/to/${d2[0]}/12/31/`,
                            setData
                          ),
                        setPath
                      );
                      setTitle(
                        `${new Date(d1[0], d1[1] - 1, d1[2]).toLocaleString("en-US", { year: "numeric" }).toUpperCase()} - ${date2.toLocaleString("en-US", { year: "numeric" }).toUpperCase()} `
                      );
                      break;
                  }
                }
              }}
              views={repr[VALUE]}
            />

            <DatePicker
              sx={{
                marginRight: "1rem",
                width: "20vw",
                "& .MuiInputLabel-root": {
                  height: "2rem",
                },
                "& input": {
                  height: "2rem",
                },
              }}
              label="To"
              value={dayjs(date2)}
              onChange={(value) => {
                setDate2(value);
                const d1 = dayjs(date1).format("YYYY-MM-DD").split("-");
                const d2 = value.format("YYYY-MM-DD").split("-");
                switch (VALUE) {
                  case 0:
                    requestWrapper(
                      () =>
                        setChoices(
                          `${baseURL}d/timeline/${d1[0]}/${d1[1]}/${d1[2]}/to/${d2[0]}/${d2[1]}/${d2[2]}/`,
                          setData
                        ),
                      setPath
                    );
                    setTitle(
                      `${date1.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} - ${new Date(d2[0], d2[1] - 1, d2[2]).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} `
                    );
                    break;
                  case 1:
                    requestWrapper(
                      () =>
                        setChoices(
                          `${baseURL}m/timeline/${d1[0]}/${d1[1]}/1/to/${d2[0]}/${d2[1]}/31/`,
                          setData
                        ),
                      setPath
                    );
                    setTitle(
                      `${date1.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} - ${new Date(d2[0], d2[1] - 1, d2[2]).toLocaleString("en-US", { year: "numeric", month: "short" }).toUpperCase()} `
                    );
                    break;
                  case 2:
                    requestWrapper(
                      () =>
                        setChoices(
                          `${baseURL}y/timeline/${d1[0]}/01/01/to/${d2[0]}/12/31/`,
                          setData
                        ),
                      setPath
                    );
                    setTitle(
                      `${date1.toLocaleString("en-US", { year: "numeric" }).toUpperCase()} - ${new Date(d2[0], d2[1] - 1, d2[2]).toLocaleString("en-US", { year: "numeric" }).toUpperCase()} `
                    );
                    break;
                }
              }}
              views={repr[VALUE]}
            />
          </LocalizationProvider>
        </div>
      </Container>
    </div>
  );
}

export function CompareControlBoard({ setData, baseURL, setTitle, setPath }) {
  const currentDate = new Date();
  const oneMonthAgo = new Date(currentDate);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [VALUE, setType] = React.useState(1);
  const [date1, setDate1] = React.useState(currentDate);
  const [date2, setDate2] = React.useState(oneMonthAgo);
  const repr = {
    0: ["year", "month", "day"],
    1: ["year", "month"],
    2: ["year"],
  };

  React.useEffect(() => {
    requestWrapper(
      () =>
        setChoices(
          `${baseURL}data/${date1.getFullYear()}/${date1.getMonth() + 1}/0/compare/${date2.getFullYear()}/${date2.getMonth() + 1}/0/`,
          setData
        ),
      setPath
    );
    setTitle(
      `${date1.toLocaleString("en-US", { year: "numeric", month: "short" }).toUpperCase()}  VS ${date2.toLocaleString("en-US", { year: "numeric", month: "short" }).toUpperCase()} `
    );
  }, []);

  return (
    <Container>
      <div className="flex w-[100%] justify-center items-center">
        <FormControl sx={{ marginX: "1rem", width: "20vw" }}>
          <InputLabel sx={{ height: "2rem" }} id="demo-simple-select-label">
            Filter Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={VALUE}
            label="Filter Type"
            sx={{
              paddingX: "1rem",
              "& .MuiSelect-select": {
                zIndex: 100,
              },
            }}
            onChange={(event) => {
              setDate1(null);
              setDate2(null);
              setType(event.target.value);
            }}
          >
            <MenuItem value={0}>Date</MenuItem>
            <MenuItem value={1}>Month</MenuItem>
            <MenuItem value={2}>Year</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              marginRight: "1rem",
              width: "20vw",
              "& .MuiInputLabel-root": {
                height: "2rem", // Customize label color
              },
              "& input": {
                height: "2rem",
              },
            }}
            label="Date"
            value={dayjs(date1)}
            onChange={(value) => {
              const date = value.format("YYYY-MM-DD").split("-");
              setDate1(new Date(date[0], date[1] - 1, date[2]));
              setDate2(null);
              switch (VALUE) {
                case 0:
                  requestWrapper(
                    () =>
                      setChoices(
                        `${baseURL}data/${date[0]}/${date[1]}/${date[2]}/`,
                        setData
                      ),
                    setPath
                  );
                  setTitle(
                    `${new Date(date[0], date[1] - 1, date[2]).toLocaleString("en-LK", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} `
                  );
                  break;
                case 1:
                  requestWrapper(
                    () =>
                      setChoices(
                        `${baseURL}data/${date[0]}/${date[1]}/0/`,
                        setData
                      ),
                    setPath
                  );
                  setTitle(
                    `${new Date(date[0], date[1] - 1).toLocaleString("en-LK", { year: "numeric", month: "short" }).toUpperCase()} `
                  );
                  break;
                case 2:
                  requestWrapper(
                    () => setChoices(`${baseURL}data/${date[0]}/0/0/`, setData),
                    setPath
                  );
                  setTitle(
                    `${new Date(date[0]).toLocaleString("en-LK", { year: "numeric" }).toUpperCase()} `
                  );
                  break;
              }
            }}
            views={repr[VALUE]}
          />

          <DatePicker
            sx={{
              marginRight: "1rem",
              width: "20vw",
              "& .MuiInputLabel-root": {
                height: "2rem", 
              },
              "& input": {
                height: "2rem",
              },
            }}
            label="Compare"
            value={dayjs(date2)}
            onChange={(value) => {
              const d1 = dayjs(date1).format("YYYY-MM-DD").split("-");
              const d2 = value.format("YYYY-MM-DD").split("-");
              setDate2(new Date(d2[0], d2[1] - 1, d2[2]));

              switch (VALUE) {
                case 0:
                  requestWrapper(
                    () =>
                      setChoices(
                        `${baseURL}data/${d1[0]}/${d1[1]}/${d1[2]}/compare/${d2[0]}/${d2[1]}/${d2[2]}/`,
                        setData
                      ),
                    setPath
                  );
                  setTitle(
                    `${date1.toLocaleString("en-LK", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()}  VS ${new Date(d2[0], d2[1] - 1, d2[2]).toLocaleString("en-LK", { year: "numeric", month: "short", day: "numeric" }).toUpperCase()} `
                  );
                  break;
                case 1:
                  requestWrapper(
                    () =>
                      setChoices(
                        `${baseURL}data/${d1[0]}/${d1[1]}/0/compare/${d2[0]}/${d2[1]}/0/`,
                        setData
                      ),
                    setPath
                  );
                  setTitle(
                    `${date1.toLocaleString("en-LK", { year: "numeric", month: "short" }).toUpperCase()}  VS ${new Date(d2[0], d2[1] - 1, d2[2]).toLocaleString("en-LK", { year: "numeric", month: "short" }).toUpperCase()} `
                  );
                  break;
                case 2:
                  requestWrapper(
                    () =>
                      setChoices(
                        `${baseURL}data/${d1[0]}/0/0/compare/${d2[0]}/0/0/`,
                        setData
                      ),
                    setPath
                  );
                  setTitle(
                    `${date1.toLocaleString("en-LK", { year: "numeric" }).toUpperCase()}  VS ${new Date(d2[0], d2[1] - 1, d2[2]).toLocaleString("en-LK", { year: "numeric" }).toUpperCase()} `
                  );
                  break;
              }
            }}
            views={repr[VALUE]}
          />
        </LocalizationProvider>
      </div>
    </Container>
  );
}

export function ParametersBoard({ keys, y, setY }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: "none", 
        padding: 1,
        backgroundColor: theme.palette.background.paper,
        height: "100%",
        width: "100%",
        border: "1px solid",
        borderColor: theme.palette.border.color,
        borderRadius: "8px",
      }}
    >
      <CardContent>
        <FormControl>
          <FormLabel>Parameter</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={y}
            name="radio-buttons-group"
            row
          >
            {(keys ?? []).map((key) => (
              <FormControlLabel
                value={key}
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#02b2af", 
                      },
                    }}
                    onClick={(e, value) => {
                      setY(e.target.value);
                    }}
                    defaultChecked
                  />
                }
                label={convertToTitleCase(key)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

export function GraphTypeControl({ choices, type, setType }) {
  return (
    <FormControl sx={{ margin: { xs: "1rem", md: "0" }, width: "11rem" }}>
      <InputLabel id="demo-simple-select-label" sx={{ height: "2rem" }}>
        Chart Type
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        label=" Chart Type "
        sx={{ paddingX: "1rem", "& .MuiSelect-select": {} }}
        onChange={(event) => {
          setType(event.target.value);
        }}
      >
        {choices.includes("bar") && <MenuItem value={0}>Bar Chart</MenuItem>}
        {choices.includes("pie") && <MenuItem value={1}>Pie Chart</MenuItem>}
        {choices.includes("line") && <MenuItem value={2}>Line Chart</MenuItem>}
        {choices.includes("radar") && (
          <MenuItem value={3}>Radar Chart</MenuItem>
        )}
        {choices.includes("heatmap") && <MenuItem value={4}>Heatmap</MenuItem>}
        {choices.includes("calendar") && (
          <MenuItem value={5}>Calendar</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
