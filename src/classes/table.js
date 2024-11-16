import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
    DataGrid, gridClasses, gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector
} from "@mui/x-data-grid";
import React from "react";
import { requestWrapper } from "../fns";
import { RETRIEVE } from "./form_fields";

import MuiPagination from "@mui/material/Pagination";
import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { fontSizes } from "../styles";

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}

function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}

export default class Table extends React.Component {
  constructor() {
    super();
    this.state = { successAlert: false, failAlert: false };
  }

  componentDidMount() {
    this.setSuccessAlert = this.setSuccessAlert.bind(this);
    this.setFailAlert = this.setFailAlert.bind(this);
  }

  setSuccessAlert(value) {
    this.setState({ successAlert: value });
  }

  setFailAlert(value) {
    this.setState({ failAlert: value });
  }

  LoadData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `${process.env.REACT_APP_API}/${this.props.dataAPI}?all=1`, true);
    const accessToken = localStorage.getItem("accessToken");
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    const setstate = this.props.setState;
    const set_SuccessAlert = this.setSuccessAlert;
    const set_FailAlert = this.setFailAlert;
    this.props.setState({ loading: true, progress: 0 });

    xhr.onload = function (
      a,
      set_state = setstate,
      set_success_alert = set_SuccessAlert,
      set_fail_alert = set_FailAlert
    ) {
      if (xhr.status >= 200 && xhr.status < 300) {
        set_state({
          rows: JSON.parse(this.response),
          loading: false,
          progress: 0,
        });
        set_SuccessAlert("All The Data Fetched Successfully!");
      } else {
        set_FailAlert("Error Occured");
      }
    };

    xhr.onprogress = (event, set_state = setstate) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded * 100) / event.total);
        set_state({ progress: percentComplete });
      }
    };

    xhr.onerror = function () {
        set_FailAlert("Network Error");
    };

    xhr.send();
  }

  CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ padding: "0.5rem 1rem" }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: "Change density" } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
          slotProps={{
            tooltip: { title: "Export data" },
            button: { variant: "text" },
          }}
        />
        <Button
          onClick={() =>
            requestWrapper(() => this.LoadData.bind(this)(), this.props.setPath)
          }
          startIcon={<DownloadingOutlinedIcon />}
        >
          Fetch All Data
        </Button>
      </GridToolbarContainer>
    );
  }

  render() {
    return (
      <div style={{ width: "100%" }} className={`py-[1rem]`}>
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
        <DataGrid
          sx={{
            [`& .${gridClasses.cell}:focus`]: {
              outline: "none",
            },

            minHeight: "65vh",
            width: "auto",

            [`& .${gridClasses.columnHeader}:focus`]: {
              outline: "none",
            },
            "& .Mui-selected": {
              backgroundColor: "transparent !important",
              "&:hover": {
                backgroundColor: "transparent !important",
              },
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              ...fontSizes,
            },
            "& .MuiDataGrid-cell": {
              ...fontSizes,
            },
          }}
          hideFooterRowCount={true}
          rows={this.props.state.rows}
          componentsProps={{
            toolbar: {
              selectedRowCount: 0,
            },
          }}
          getRowId={this.props.id_function}
          columns={this.props.columns}
          slots={{
            pagination: CustomPagination,
            toolbar: this.CustomToolbar.bind(this),
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          onRowClick={({ id }) => {
            if (this.props.onClick) {
              this.props.onClick(id);
            } else {
              requestWrapper(
                () =>
                  fetch(`${process.env.REACT_APP_API}/${this.props.dataAPI}${id}`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      this.props.setState({
                        selectedItem: id,
                        formOpen: true,
                        formContent: data,
                        selectedItem: id,
                        formStatus: RETRIEVE,
                      });
                    }),
                this.props.setPath
              );
            }
          }}
        />

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: 2000 })}
          open={this.props.state.loading}
        >
          <CircularProgress
            color="inherit"
            variant="determinate"
            value={this.props.state.progress}
          />
        </Backdrop>
      </div>
    );
  }
}
