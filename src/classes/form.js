import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Snackbar,
  Stack,
} from "@mui/material";
import React from "react";
import { ConfirmationDialogBox } from "../components/dialog_boxes";
import { requestWrapper } from "../fns";
import { CREATE, RETRIEVE, UPDATE } from "./form_fields";

import ExtensionIcon from "@mui/icons-material/Extension";

export class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      closeConfirmationDialog: false,
      cancelConfirmationDialog: false,
      deleteConfirmationDialog: false,
      successAlert: false,
      failAlert: false,
      imageView: false,
    };
  }

  componentDidMount() {
    this.setDeleteConfirmationDialog =
      this.setDeleteConfirmationDialog.bind(this);
    this.setCloseConfirmationDialog =
      this.setCloseConfirmationDialog.bind(this);
    this.setCancelConfirmationDialog =
      this.setCancelConfirmationDialog.bind(this);
    this.setSuccessAlert = this.setSuccessAlert.bind(this);
    this.setFailAlert = this.setFailAlert.bind(this);
  }

  setDeleteConfirmationDialog(value) {
    this.setState({ deleteConfirmationDialog: value });
  }

  setImageViewDialog(value) {
    this.setState({ imageView: value });
  }

  setCloseConfirmationDialog(value) {
    this.setState({ closeConfirmationDialog: value });
  }

  setCancelConfirmationDialog(value) {
    this.setState({ cancelConfirmationDialog: value });
  }

  setSuccessAlert(value) {
    this.setState({ successAlert: value });
  }

  setFailAlert(value) {
    this.setState({ failAlert: value });
  }

  closeButtonClick() {
    if (this.props.state.formStatus === RETRIEVE) {
      this.props.setState({ formOpen: false, errors: {} });
    } else {
      let changed = false;

      this.props.postData.forEach(
        (item) =>
          (changed |=
            (item,
            this.props.state.formContent[item] !=
              this.props.state.formContent[item + "-init"]))
      );

      if (changed) {
        this.setState({ closeConfirmationDialog: true });
      } else {
        this.props.setState({ formOpen: false, errors: {} });
      }
    }
  }

  cancelButtonClick() {
    if (this.props.state.formStatus === RETRIEVE) {
      this.props.setState({ formOpen: false, errors: {} });
    } else {
      let changed = false;

      this.props.postData.forEach(
        (item) =>
          (changed |=
            (item,
            this.props.state.formContent[item] !=
              this.props.state.formContent[item + "-init"]))
      );

      if (changed) {
        this.setState({ cancelConfirmationDialog: true });
      } else {
        this.props.setState({ formStatus: RETRIEVE });
      }
    }
  }

  deleteButtonClick() {
    this.setDeleteConfirmationDialog(true);
  }

  updateButtonClick() {
    this.props.setState({ formStatus: UPDATE });
  }

  addItemButtonClick() {
    this.props.setState({ errors: {} });
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    this.props.postData.forEach((item) => {
      switch (typeof this.props.state.formContent[item]) {
        case "object":
          function blobToFile(blob) {
            const date = new Date();
            return new File([blob], date.toString() + ".jpg", {
              type: blob.type,
            });
          }
          formData.append(item, blobToFile(this.props.state.formContent[item]));
          break;

        default:
          formData.append(item, this.props.state.formContent[item]);
          break;
      }
    });

    xhr.open(
      "POST",
      `${process.env.REACT_APP_API}/${this.props.router.POST}`,
      true
    );
    const accessToken = localStorage.getItem("accessToken");
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    var property = this.props;
    const set_SuccessAlert = this.setSuccessAlert;
    const set_FailAlert = this.setFailAlert;
    xhr.onload = function (
      a,
      prop = property,
      set_success_alert = set_SuccessAlert,
      set_fail_alert = set_FailAlert
    ) {
      if (xhr.status - 200 < 100) {
        fetch(`${process.env.REACT_APP_API}/${prop.router.GET}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) =>
            prop.setState({ formOpen: false, loading: false, rows: data })
          );
        set_success_alert(`${prop.itemName} Added Successfully`);
      } else {
        const errors = JSON.parse(xhr.response);
        prop.setState({ errors: errors, loading: false });
        set_fail_alert(
          `${Object.keys(errors)[0].toUpperCase()} Field : ${Object.values(errors)[0]}`
        );
      }
    };
    xhr.send(formData);
    this.props.setState({ loading: true });
  }

  updateItemButtonClick() {
    this.props.setState({ errors: {} });
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    this.props.putData.forEach((item) => {
      if (
        this.props.state.formContent[item] !=
        this.props.state.formContent[item + "-init"]
      ) {
        switch (typeof this.props.state.formContent[item]) {
          case "object":
            function blobToFile(blob) {
              const date = new Date();
              return new File([blob], date.toString() + ".jpg", {
                type: blob.type,
              });
            }
            formData.append(
              item,
              blobToFile(this.props.state.formContent[item])
            );
            break;

          default:
            formData.append(item, this.props.state.formContent[item]);
            break;
        }
      }
    });

    xhr.open(
      "PUT",
      `${process.env.REACT_APP_API}/${this.props.router.PUT}${this.props.state.formContent[this.props.postData[0]]}/`,
      true
    );
    const accessToken = localStorage.getItem("accessToken");
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    var property = this.props;

    const set_SuccessAlert = this.setSuccessAlert;
    const set_FailAlert = this.setFailAlert;
    xhr.onload = function (
      a,
      prop = property,
      set_success_alert = set_SuccessAlert,
      set_fail_alert = set_FailAlert
    ) {
      if (xhr.status - 200 < 100) {
        fetch(`${process.env.REACT_APP_API}/${prop.router.GET}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) =>
            prop.setState({
              formStatus: RETRIEVE,
              rows: data,
              loading: false,
              formOpen: false,
            })
          );
        prop.putData.forEach((item) => {
          prop.setFormContent({
            [item + "-init"]: prop.state.formContent[item],
          });
        });
        set_success_alert(`${prop.itemName} Updated Successfully`);
      } else {
        const errors = JSON.parse(xhr.response);
        prop.setState({ errors: errors, loading: false });
        set_fail_alert(
          `${Object.keys(errors)[0].toUpperCase()} Field : ${Object.values(errors)[0]}`
        );
      }
    };
    xhr.send(formData);
    this.props.setState({ loading: true });
  }

  deleteItemButtonClick() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "DELETE",
      `${process.env.REACT_APP_API}/${this.props.router.DELETE}${this.props.state.formContent[this.props.postData[0]]}`,
      true
    );
    const accessToken = localStorage.getItem("accessToken");
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    var property = this.props;
    const set_SuccessAlert = this.setSuccessAlert;
    const set_FailAlert = this.setFailAlert;
    xhr.onload = function (
      a,
      prop = property,
      set_success_alert = set_SuccessAlert,
      set_fail_alert = set_FailAlert
    ) {
      if (xhr.status - 200 < 100) {
        fetch(`${process.env.REACT_APP_API}/${prop.router.GET}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) =>
            prop.setState({
              formOpen: false,
              loading: false,
              formStatus: RETRIEVE,
              rows: data,
            })
          );
        set_success_alert(`${prop.itemName} Deleted Successfully`);
      } else {
        prop.setState({ errors: JSON.parse(xhr.response), loading: false });
        set_fail_alert(JSON.parse(xhr.response).error);
      }
    };
    xhr.send();
    this.props.setState({ loading: true });
  }

  closeFormConfirm() {
    this.props.setState({ formOpen: false, formContent: {}, errors: {} });
  }

  cancelFormConfirm() {
    this.props.setState({ formStatus: RETRIEVE });
  }

  render() {
    return (
      <div>
        <Snackbar
          sx={{ zIndex: 2100 }}
          open={this.state.successAlert}
          autoHideDuration={3000}
          onClose={() => this.setSuccessAlert(false)}
        >
          <Alert severity="success">{this.state.successAlert}</Alert>
        </Snackbar>
        <Snackbar
          sx={{ zIndex: 2100 }}
          open={this.state.failAlert}
          autoHideDuration={3000}
          onClose={() => this.setFailAlert(false)}
        >
          <Alert severity="error">{this.state.failAlert}</Alert>
        </Snackbar>
        <Dialog
          open={this.props.formOpen}
          PaperProps={{
            component: "form",
          }}
          BackdropProps={{
            style: { opacity: 0.3 },
          }}
          sx={{ zIndex: 1600, top: "4rem" }}
          fullWidth={true}
        >
          <ConfirmationDialogBox
            title={"Continue Editing?"}
            open={this.state.closeConfirmationDialog}
            setOpen={this.setCloseConfirmationDialog}
            message={`Are you sure you want exit from the from. All the changes won't be saved.`}
            onConfirm={() => {
              this.closeFormConfirm();
            }}
            onCancel={() => {}}
            closeButton={"Continue Editing"}
            confirmButton={"Exit"}
          />
          <ConfirmationDialogBox
            title={"Continue Editing?"}
            open={this.state.cancelConfirmationDialog}
            setOpen={this.setCancelConfirmationDialog}
            message={`Are you sure you want exit from the from. All the changes won't be saved.`}
            onConfirm={() => {
              this.cancelFormConfirm();
            }}
            onCancel={() => {}}
            closeButton={"Continue Editing"}
            confirmButton={"Exit"}
          />
          <ConfirmationDialogBox
            title={"Delete Items"}
            open={this.state.deleteConfirmationDialog}
            setOpen={this.setDeleteConfirmationDialog}
            message={`Are you sure you want to delete selected item?`}
            onConfirm={() => {
              this.deleteItemButtonClick();
            }}
            onCancel={() => {}}
            closeButton={"Cancel"}
            confirmButton={"Delete"}
          />
          <DialogContent>
            <Stack
              spacing={2}
              marginY={"1rem"}
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: "flex" }}
            >
              {this.props.children}
            </Stack>
          </DialogContent>
          <DialogActions
            sx={{
              margin: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              {this.props.state.formStatus == RETRIEVE && this.props.id && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    justifyContent: "start",
                    paddingX: "1rem",
                  }}
                  size="small"
                  startIcon={<ExtensionIcon />}
                  onClick={() => {
                    this.props.setSelectedItem(
                      this.props.state.formContent[this.props.id]
                    );
                  }}
                >
                  {this.props.itemName} Content
                </Button>
              )}
              {this.props.state.formStatus == CREATE &&
                this.props.methods.create && (
                  <Button
                    sx={{
                      textTransform: "none",
                      display: "flex",
                      justifyContent: "start",
                      paddingX: "1rem",
                    }}
                    size="small"
                    startIcon={<PlaylistAddOutlinedIcon />}
                    onClick={() => {
                      requestWrapper(
                        this.addItemButtonClick.bind(this),
                        this.props.setPath
                      );
                    }}
                  >
                    Add {this.props.itemName}
                  </Button>
                )}
              {this.props.state.formStatus == RETRIEVE &&
                this.props.methods.delete && (
                  <Button
                    color="error"
                    sx={{
                      textTransform: "none",
                      display: "flex",
                      paddingX: "1rem",
                      justifyContent: "start",
                    }}
                    size="small"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    onClick={() => {
                      requestWrapper(
                        this.deleteButtonClick.bind(this),
                        this.props.setPath
                      );
                    }}
                  >
                    Delete {this.props.itemName}
                  </Button>
                )}
              {this.props.state.formStatus == UPDATE &&
                this.props.methods.update && (
                  <Button
                    color="success"
                    sx={{
                      textTransform: "none",
                      display: "flex",
                      justifyContent: "start",
                      paddingX: "1rem",
                    }}
                    size="small"
                    startIcon={<TaskAltIcon />}
                    onClick={() => {
                      requestWrapper(
                        this.updateItemButtonClick.bind(this),
                        this.props.setPath
                      );
                    }}
                  >
                    Save Changes
                  </Button>
                )}
              {this.props.state.formStatus == RETRIEVE &&
                this.props.methods.update && (
                  <Button
                    sx={{
                      textTransform: "none",
                      display: "flex",
                      justifyContent: "start",
                      paddingX: "1rem",
                    }}
                    size="small"
                    startIcon={<UpdateIcon />}
                    onClick={() => {
                      this.updateButtonClick();
                    }}
                  >
                    Update {this.props.itemName}
                  </Button>
                )}
            </div>
            <div>
              {(this.props.state.formStatus == RETRIEVE ||
                this.props.state.formStatus == CREATE) && (
                <Button
                  color="warning"
                  sx={{
                    textTransform: "none",
                    paddingX: "1rem",
                    display: "flex",
                    justifyContent: "start",
                  }}
                  size="small"
                  endIcon={<HighlightOffIcon />}
                  onClick={() => {
                    this.closeButtonClick();
                  }}
                >
                  Close
                </Button>
              )}
              {this.props.state.formStatus == UPDATE && (
                <Button
                  color="error"
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    paddingX: "1rem",
                    justifyContent: "start",
                  }}
                  size="small"
                  endIcon={<HighlightOffIcon />}
                  onClick={() => {
                    this.cancelButtonClick();
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
