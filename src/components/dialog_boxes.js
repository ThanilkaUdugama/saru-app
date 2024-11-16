import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import React from "react";

export class ConfirmationDialogBox extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.setOpen(false)}
        sx={{ fontFamily: "Poppins", zIndex: 1800 }}
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Poppins" }}
            id="alert-dialog-description"
          >
            {this.props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => {
              this.props.onCancel();
              this.props.setOpen(false);
            }}
          >
            {this.props.closeButton}
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            color="warning"
            onClick={() => {
              this.props.onConfirm();
              this.props.setOpen(false);
            }}
            autoFocus
          >
            {this.props.confirmButton}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export class ImageView extends React.Component {
  render() {
    const handleDownload = async (src) => {
      try {
        const response = await fetch(src);
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "screenshot.jpg";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download image:", error);
      }
    };
    return (
      <Dialog
        open={this.props.src}
        onClose={() => this.props.close()}
        sx={{ fontFamily: "Poppins", zIndex: 1800 }}
      >
        <DialogContent>
          <img
            className="object-cover w-[100%] h-[100%] rounded-md"
            src={this.props.src}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => {
              handleDownload(this.props.src);
            }}
          >
            Download
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            color="warning"
            onClick={() => this.props.close()}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
