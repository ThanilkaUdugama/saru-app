import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
    Autocomplete,
    Avatar,
    Button,
    Divider,
    FormHelperText,
    Skeleton,
    Stack,
    styled,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {
    DateField,
    TimeField
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import { ImageView } from "../components/dialog_boxes";
import { getValueInRange } from "../fns";

export const RETRIEVE = 0;
export const CREATE = 1;
export const UPDATE = 2;

const readonly_style = {
  readOnly: true,
  style: {
    pointerEvents: "none",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const changed_fn = (x, new_value) => {
  if (x.props.onChange) x.props.onChange(new_value);
  x.props.setFormState({ [x.props.elementId]: new_value });
};

const set_primary_properties = (x, defaultValue = "") => {
  const initValue =
    x.props.formState.formContent[x.props.elementId] ?? defaultValue;
  if (x.props.formState.formStatus == CREATE)
    x.props.setFormState({
      [x.props.elementId]: initValue,
      [x.props.elementId + "-init"]: initValue,
    });
  else
    x.props.setFormState({
      [x.props.elementId]: x.props.formState.formContent[x.props.elementId],
      [x.props.elementId + "-init"]:
        x.props.formState.formContent[x.props.elementId],
    });
};

const image_upload = (ctx, event, update_progress) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const blob = new Blob([arrayBuffer], { type: file.type });
      ctx.props.setFormState({ [ctx.props.elementId]: blob });
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        update_progress(percentComplete);
      }
    };

    reader.onloadstart = () => {
      update_progress(0);
    };

    reader.onloadend = () => {
      update_progress(null);
    };
    reader.readAsArrayBuffer(event.target.files[0]);
  }
};

export class TextFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue);
  }

  render() {
    if (this.props.hide ?? false) return null;
    if (
      this.props.parentId &&
      !this.props.formState.formContent[this.props.parentId] &&
      this.props.formState.formContent[this.props.elementId]
    )
      this.props.setFormState({ [this.props.elementId]: "" });
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        return (
          <TextField
            autoComplete="off"
            id={this.props.elementId}
            helperText={
              this.props.formState.errors
                ? this.props.formState.errors[this.props.elementId]
                : ""
            }
            error={
              this.props.formState.errors
                ? this.props.formState.errors[this.props.elementId]
                : false
            }
            label={this.props.elementLabel}
            type="text"
            sx={{
              display: (
                this.props.parentId
                  ? Boolean(
                      this.props.formState.formContent[this.props.parentId]
                    )
                  : true
              )
                ? "flex"
                : "none",
            }}
            disabled={
              this.props.formState.formStatus == UPDATE &&
              (this.props.noAlter ?? false)
            }
            fullWidth={true}
            value={this.props.formState.formContent[this.props.elementId]}
            InputProps={{
              ...((this.props.autoFill ?? false) ? readonly_style : {}),
              startAdornment: this.props.prefix ? (
                <InputAdornment position="start">
                  {this.props.prefix}
                </InputAdornment>
              ) : null,
              endAdornment: this.props.suffix ? (
                <InputAdornment position="end">
                  {this.props.suffix}
                </InputAdornment>
              ) : null,
            }}
            variant="outlined"
            onChange={(element) => changed_fn(this, element.target.value)}
          />
        );

      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] && (
            <TextField
              id={this.props.elementId}
              label={this.props.elementLabel}
              type="text"
              fullWidth={true}
              value={this.props.formState.formContent[this.props.elementId]}
              InputProps={{
                ...readonly_style,
                startAdornment: this.props.prefix ? (
                  <InputAdornment position="start">
                    {this.props.prefix}
                  </InputAdornment>
                ) : null,
                endAdornment: this.props.suffix ? (
                  <InputAdornment position="end">
                    {this.props.suffix}
                  </InputAdornment>
                ) : null,
              }}
              variant="outlined"
            />
          )
        );
    }
  }
}

export class NumberFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue);
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        if (
          this.props.parentId &&
          !this.props.formState.formContent[this.props.parentId] &&
          this.props.formState.formContent[this.props.elementId]
        )
          this.props.setFormState({ [this.props.elementId]: "" });
        return (
          <TextField
            autoComplete="off"
            id={this.props.elementId}
            helperText={
              this.props.formState.errors
                ? this.props.formState.errors[this.props.elementId]
                : ""
            }
            error={
              this.props.formState.errors
                ? this.props.formState.errors[this.props.elementId]
                : false
            }
            label={this.props.elementLabel}
            sx={{
              display: (
                this.props.parentId
                  ? Boolean(
                      this.props.formState.formContent[this.props.parentId]
                    )
                  : true
              )
                ? "flex"
                : "none",
            }}
            type="number"
            disabled={
              this.props.formState.formStatus == UPDATE &&
              (this.props.noAlter ?? false)
            }
            fullWidth={true}
            value={this.props.formState.formContent[this.props.elementId]}
            InputProps={{
              ...((this.props.autoFill ?? false) ? readonly_style : {}),
              startAdornment: this.props.prefix ? (
                <InputAdornment position="start">
                  {this.props.prefix}
                </InputAdornment>
              ) : null,
              endAdornment: this.props.suffix ? (
                <InputAdornment position="end">
                  {this.props.suffix}
                </InputAdornment>
              ) : null,
            }}
            variant="outlined"
            onChange={(element) => {
              changed_fn(
                this,
                getValueInRange(
                  this.props.min,
                  this.props.max,
                  element.target.value ?? 0
                )
              );
            }}
          />
        );
      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] != "" && (
            <TextField
              id={this.props.elementId}
              label={this.props.elementLabel}
              type="number"
              fullWidth={true}
              value={this.props.formState.formContent[this.props.elementId]}
              InputProps={{
                ...readonly_style,
                startAdornment: this.props.prefix ? (
                  <InputAdornment position="start">
                    {this.props.prefix}
                  </InputAdornment>
                ) : null,
                endAdornment: this.props.suffix ? (
                  <InputAdornment position="end">
                    {this.props.suffix}
                  </InputAdornment>
                ) : null,
              }}
              variant="outlined"
              onChange={(element) => {
                changed_fn(
                  this,
                  getValueInRange(
                    this.props.min,
                    this.props.max,
                    element.target.value ?? 0
                  )
                );
              }}
            />
          )
        );
    }
  }
}

export class ChooseFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue);
  }

  render() {
    if (this.props.hide ?? false) return null;
    if (
      this.props.parentId &&
      !this.props.formState.formContent[this.props.parentId] &&
      this.props.formState.formContent[this.props.elementId]
    )
      this.props.setFormState({ [this.props.elementId]: "" });
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        if (
          this.props.parentId
            ? Boolean(this.props.formState.formContent[this.props.parentId])
            : true
        )
          return (
            <Autocomplete
              id={this.props.elementId}
              disablePortal={true}
              fullWidth={true}
              disabled={
                this.props.formState.formStatus == UPDATE &&
                (this.props.noAlter ?? false)
              }
              value={
                this.props.representation
                  ? this.props.representation[
                      this.props.formState.formContent[this.props.elementId]
                    ]
                  : this.props.formState.formContent[this.props.elementId]
              }
              options={this.props.options}
              renderInput={(params) => (
                <TextField
                  error={
                    this.props.formState.errors
                      ? this.props.formState.errors[this.props.elementId]
                      : false
                  }
                  helperText={
                    this.props.formState.errors
                      ? this.props.formState.errors[this.props.elementId]
                      : ""
                  }
                  {...params}
                  label={this.props.elementLabel}
                />
              )}
              variant="outlined"
              onChange={(element, selectedItem) => {
                changed_fn(this, selectedItem ? selectedItem.value : "");
              }}
            />
          );
      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] != null && (
            <TextField
              id={this.props.elementId}
              label={this.props.elementLabel}
              fullWidth={true}
              value={
                this.props.representation
                  ? this.props.representation[
                      this.props.formState.formContent[this.props.elementId]
                    ]
                  : this.props.formState.formContent[this.props.elementId]
              }
              InputProps={{
                ...readonly_style,
                startAdornment: this.props.prefix ? (
                  <InputAdornment position="start">
                    {this.props.prefix}
                  </InputAdornment>
                ) : null,
                endAdornment: this.props.suffix ? (
                  <InputAdornment position="end">
                    {this.props.suffix}
                  </InputAdornment>
                ) : null,
              }}
              variant="outlined"
            />
          )
        );
    }
  }
}

export class RadioFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue);
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        return (
          <FormControl fullWidth={true} sx={{ paddingX: "0.5rem" }}>
            <FormLabel sx={{ fontSize: "0.8rem" }}>
              {this.props.elementLabel}
            </FormLabel>
            <RadioGroup
              sx={{
                display: (
                  this.props.parentId
                    ? Boolean(
                        this.props.formState.formContent[this.props.parentId]
                      )
                    : true
                )
                  ? "flex"
                  : "none",
              }}
              disabled={
                this.props.formState.formStatus == UPDATE &&
                (this.props.noAlter ?? false)
              }
              value={this.props.formState.formContent[this.props.elementId]}
              onChange={(e, selectedItem) => changed_fn(this, selectedItem)}
            >
              {this.props.options.map((selectedItem) => (
                <FormControlLabel
                  value={selectedItem.value}
                  control={<Radio />}
                  label={selectedItem.label}
                />
              ))}
            </RadioGroup>

            <FormHelperText sx={{ color: "#f44336" }}>
              {this.props.formState.errors
                ? this.props.formState.errors[this.props.elementId]
                : ""}
            </FormHelperText>
          </FormControl>
        );
      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] && (
            <FormControl fullWidth={true} sx={{ paddingX: "0.5rem" }}>
              <FormLabel sx={{ fontSize: "0.8rem" }}>
                {this.props.elementLabel}
              </FormLabel>
              <RadioGroup
                value={this.props.formState.formContent[this.props.elementId]}
              >
                {this.props.options.map((selectedItem) => (
                  <FormControlLabel
                    value={selectedItem.value}
                    control={<Radio onClick={(e) => e.preventDefault()} />}
                    label={selectedItem.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )
        );
    }
  }
}

export class BooleanFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue ?? false);
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        return (
          <FormControlLabel
            sx={{
              display: (
                this.props.parentId
                  ? Boolean(
                      this.props.formState.formContent[this.props.parentId]
                    )
                  : true
              )
                ? "flex"
                : "none",
            }}
            disabled={
              this.props.formState.formStatus == UPDATE &&
              (this.props.noAlter ?? false)
            }
            control={
              <Android12Switch
                id={this.props.elementId}
                onClick={(e) => {
                  changed_fn(
                    this,
                    !this.props.formState.formContent[this.props.elementId]
                  );
                }}
                checked={this.props.formState.formContent[this.props.elementId]}
              />
            }
            label={this.props.elementLabel}
          />
        );
      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] != null && (
            <FormControlLabel
              control={
                <Android12Switch
                  id={this.props.elementId}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  checked={
                    this.props.formState.formContent[this.props.elementId]
                  }
                />
              }
              label={this.props.elementLabel}
            />
          )
        );
    }
  }
}

export class ProfileFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue ?? false);
  }

  render() {
    switch (this.props.formState.formStatus) {
      case RETRIEVE:
        return (
          <TextField
            id={this.props.elementId}
            label={this.props.elementLabel}
            value={
              this.props.formState.formContent[this.props.elementId + "_name"]
            }
            InputProps={{
              ...readonly_style,
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar
                    sx={{ marginRight: "1rem" }}
                    src={`${process.env.REACT_APP_API}${this.props.formState.formContent[this.props.elementId + "_image"]}`}
                  />
                </InputAdornment>
              ),
            }}
          />
        );
    }
  }
}

export class DateFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(
      this,
      this.props.defaultValue ?? dayjs().format("YYYY-MM-DD")
    );
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              disabled={
                this.props.formState.formStatus == UPDATE &&
                (this.props.noAlter ?? false)
              }
              label={this.props.elementLabel}
              id={this.props.elementId}
              format="YYYY/MM/DD"
              margin="dense"
              sx={{
                display: (
                  this.props.parentId
                    ? Boolean(
                        this.props.formState.formContent[this.props.parentId]
                      )
                    : true
                )
                  ? "flex"
                  : "none",
              }}
              error={
                this.props.formState.errors
                  ? this.props.formState.errors[this.props.elementId]
                  : false
              }
              helperText={
                this.props.formState.errors
                  ? this.props.formState.errors[this.props.elementId]
                  : ""
              }
              value={
                this.props.formState.formContent[this.props.elementId]
                  ? dayjs(
                      new Date(
                        this.props.formState.formContent[
                          this.props.elementId
                        ].split("-")[0],
                        Number(
                          this.props.formState.formContent[
                            this.props.elementId
                          ].split("-")[1]
                        ) - 1,
                        this.props.formState.formContent[
                          this.props.elementId
                        ].split("-")[2]
                      )
                    )
                  : null
              }
              onChange={(newValue) => {
                changed_fn(
                  this,
                  dayjs(newValue.toString()).format("YYYY-MM-DD")
                );
              }}
            />
          </LocalizationProvider>
        );

      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                sx={{ overflowY: "visible !important" }}
                label={this.props.elementLabel}
                id={this.props.elementId}
                format="YYYY/MM/DD"
                error={
                  this.props.formState.errors
                    ? this.props.formState.errors[this.props.elementId]
                    : false
                }
                helperText={
                  this.props.formState.errors
                    ? this.props.formState.errors[this.props.elementId]
                    : ""
                }
                InputProps={{ ...readonly_style }}
                value={
                  this.props.formState.formContent[this.props.elementId]
                    ? dayjs(
                        new Date(
                          this.props.formState.formContent[
                            this.props.elementId
                          ].split("-")[0],
                          Number(
                            this.props.formState.formContent[
                              this.props.elementId
                            ].split("-")[1]
                          ) - 1,
                          this.props.formState.formContent[
                            this.props.elementId
                          ].split("-")[2]
                        )
                      )
                    : null
                }
              />
            </LocalizationProvider>
          )
        );
    }
  }
}

export class TimeFormField extends React.Component {
  componentDidMount() {
    set_primary_properties(
      this,
      this.props.defaultValue ?? dayjs().format("HH:mm")
    );
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              disabled={
                this.props.formState.formStatus == UPDATE &&
                (this.props.noAlter ?? false)
              }
              label={this.props.elementLabel}
              id={this.props.elementId}
              sx={{
                display: (
                  this.props.parentId
                    ? Boolean(
                        this.props.formState.formContent[this.props.parentId]
                      )
                    : true
                )
                  ? "flex"
                  : "none",
              }}
              error={
                this.props.formState.errors
                  ? this.props.formState.errors[this.props.elementId]
                  : false
              }
              helperText={
                this.props.formState.errors
                  ? this.props.formState.errors[this.props.elementId]
                  : ""
              }
              value={
                this.props.formState.formContent[this.props.elementId]
                  ? dayjs(
                      new Date(
                        ...[
                          0,
                          0,
                          0,
                          ...this.props.formState.formContent[
                            this.props.elementId
                          ].split(":"),
                        ]
                      )
                    )
                  : null
              }
              onChange={(newValue) => {
                changed_fn(this, dayjs(newValue.toString()).format("HH:mm"));
              }}
            />
          </LocalizationProvider>
        );

      case RETRIEVE:
        return (
          this.props.formState.formContent[this.props.elementId] && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                label={this.props.elementLabel}
                id={this.props.elementId}
                error={
                  this.props.formState.errors
                    ? this.props.formState.errors[this.props.elementId]
                    : false
                }
                helperText={
                  this.props.formState.errors
                    ? this.props.formState.errors[this.props.elementId]
                    : ""
                }
                InputProps={{ ...readonly_style }}
                value={
                  this.props.formState.formContent[this.props.elementId]
                    ? dayjs(
                        new Date(
                          ...[
                            0,
                            0,
                            0,
                            ...this.props.formState.formContent[
                              this.props.elementId
                            ].split(":"),
                          ]
                        )
                      )
                    : null
                }
              />
            </LocalizationProvider>
          )
        );
    }
  }
}

export class Text extends React.Component {
  componentDidMount() {
    set_primary_properties(this, this.props.defaultValue ?? "");
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case CREATE:
        return (
          <FormHelperText
            sx={{
              paddingX: "1rem",
              display: (
                this.props.parentId
                  ? Boolean(
                      this.props.formState.formContent[this.props.parentId]
                    )
                  : true
              )
                ? "flex"
                : "none",
            }}
          >
            <div className="flex items-center">
              {this.props.icon}
              {/* <CrisisAlertIcon sx = {{color : '#757575', height : '0.9rem', marginRight : '0.3rem'}} /> */}
              {this.props.formState.formContent[this.props.elementId]}
            </div>
          </FormHelperText>
        );
    }
  }
}

export class ImageUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: null,
      image: null,
    };
  }

  componentDidMount() {
    this.updateProgress = this.updateProgress.bind(this);
    set_primary_properties(this, this.props.defaultValue ?? "");
  }

  updateProgress(progress) {
    this.setState({ progress: progress });
  }

  render() {
    if (this.props.hide ?? false) return null;
    switch (this.props.formState.formStatus) {
      case UPDATE:
      case CREATE:
        return (
          <Stack
            spacing={2}
            sx={{
              display: (
                this.props.parentId
                  ? Boolean(
                      this.props.formState.formContent[this.props.parentId]
                    )
                  : true
              )
                ? "flex"
                : "none",
            }}
          >
            <Divider variant="middle" />
            <Typography
              sx={{ color: "#757575", paddingX: "1.5rem", fontSize: "0.8rem" }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {this.props.elementLabel}
            </Typography>
            <Stack
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.props.formState.formContent[this.props.elementId] ||
              this.state.progress != null ? (
                <div
                  style={this.props.style}
                  className="relative flex justify-center items-center rounded-md"
                >
                  <CircularProgress
                    sx={{ zIndex: 3, position: "absolute" }}
                    variant="determinate"
                    value={this.state.progress}
                  />
                  {this.props.formState.formContent[this.props.elementId] ? (
                    <img
                      className="object-cover w-[100%] h-[100%] rounded-md"
                      src={
                        typeof this.props.formState.formContent[
                          this.props.elementId
                        ] == "string"
                          ? `${process.env.REACT_APP_API}${this.props.formState.formContent[this.props.elementId]}`
                          : URL.createObjectURL(
                              this.props.formState.formContent[
                                this.props.elementId
                              ]
                            )
                      }
                    />
                  ) : (
                    this.state.progress != null && (
                      <Skeleton
                        sx={{ height: "100%", width: "100%" }}
                        variant="rectangular"
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  style={{
                    ...this.props.style,
                    background:
                      localStorage.getItem("toolpad-mode") == "dark"
                        ? "#333333"
                        : "#e0e0e0",
                  }}
                  className={`relative flex justify-center items-center rounded-md`}
                ></div>
              )}
              <Button
                disabled={
                  this.props.formState.formStatus == UPDATE &&
                  (this.props.noAlter ?? false)
                }
                component="label"
                role={undefined}
                variant="contained"
                sx={{ width: "60%" }}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {this.props.formState.formContent[this.props.elementId]
                  ? `Replace ${this.props.buttonText}`
                  : `Upload ${this.props.buttonText}`}
                <VisuallyHiddenInput
                  type="file"
                  id={this.props.elementId}
                  accept="image/*"
                  onChange={(event) =>
                    image_upload(this, event, this.updateProgress)
                  }
                  multiple
                />
              </Button>
              <FormHelperText sx={{ color: "#f44336" }}>
                {this.props.formState.errors
                  ? this.props.formState.errors[this.props.elementId]
                  : ""}
              </FormHelperText>
            </Stack>
          </Stack>
        );

      case RETRIEVE:
        if (this.props.formState.formContent[this.props.elementId]) {
          const image_src =
            typeof this.props.formState.formContent[this.props.elementId] ==
            "string"
              ? `${process.env.REACT_APP_API}${this.props.formState.formContent[this.props.elementId]}`
              : URL.createObjectURL(
                  this.props.formState.formContent[this.props.elementId]
                );
          return (
            this.props.formState.formContent[this.props.elementId] && (
              <Stack spacing={2}>
                <ImageView
                  close={() => {
                    this.setState({ image: null });
                  }}
                  src={this.state.image}
                />
                <Divider variant="middle" />
                <Typography
                  sx={{
                    color: "#757575",
                    paddingX: "1.5rem",
                    fontSize: "0.8rem",
                  }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {this.props.elementLabel}
                </Typography>
                <Stack
                  spacing={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={this.props.style}
                    className="relative flex justify-center items-center rounded-md"
                  >
                    <img
                      onClick={() => this.setState({ image: image_src })}
                      className="object-cover w-[100%] h-[100%] rounded-md"
                      src={image_src}
                    />
                  </div>
                </Stack>
              </Stack>
            )
          );
        }
    }
  }
}
