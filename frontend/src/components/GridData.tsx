
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  
  {
    field: 'carNumber',
    headerName: 'צ הכלי',
    width: 150,
    editable: false,
  },
  {
    field: 'kshirot',
    headerName: 'כשירות',
    width: 150,
    editable: false,
  },
 
 
];

 

const GridFull: React.FC<{rows: any[]}> = ({rows}) => {

    return (
        <Box sx={{height:'60vh'}}>
          <Paper sx={{height:'70vh'}}>
          <DataGrid
            rows={rows}
            columns={columns}
         
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20]}
            disableRowSelectionOnClick
            
          />
          </Paper>
        </Box>
      );

    
}
export default GridFull
