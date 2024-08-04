
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
        <Box sx={{ height:400 ,width: '100%'}}>
          <DataGrid
            rows={rows}
            columns={columns}
         
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            
          />
        </Box>
      );

    
}
export default GridFull
