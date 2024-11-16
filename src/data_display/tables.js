import MuiPagination from '@mui/material/Pagination';
import {
  DataGrid, gridClasses,
  gridPageCountSelector,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

import { Box } from '@mui/material';

export function DisplayTable({columns, rows, id_function, height}){
  console.log(rows)
    return (

        <div className= {`pt-[3rem]`}>
            <DataGrid
                sx={{
                    [`& .${gridClasses.cell}:focus`]: {
                        outline: 'none',
                    },
                    [`& .${gridClasses.columnHeader}:focus`]: {
                        outline: 'none',
                    },

                    
                    '& .Mui-selected': {
                        backgroundColor: 'transparent !important',
                        '&:hover': {
                            backgroundColor: 'transparent !important',
                        },

                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                    
                    zIndex : 100,
                    
                },
                    
                    
                }}
                hideFooterRowCount = {true}
                rows={rows}
                componentsProps={{
                    toolbar: {
                        selectedRowCount: 0,
                    },
                }}
                getRowId={id_function}
                columns={columns}

                slots={{
                    pagination: CustomPagination,
                    toolbar: CustomToolbar,
                  }}


                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                
                pageSizeOptions={[10, 25, 50]}
            />                
        </div>

    );
}

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

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{padding : '0.5rem 1rem'}}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector
          slotProps={{ tooltip: { title: 'Change density' } }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarExport
             
          slotProps={{
            tooltip: { title: 'Export data' },
            button: { variant: 'text' },
          }}
        />
        
      </GridToolbarContainer>
    );
  }