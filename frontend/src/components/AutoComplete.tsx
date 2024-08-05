import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
interface ComboBoxProps {
    optionsArray: string[];
  }
  
export default function ComboBox({ optionsArray }: ComboBoxProps) {
  
  
  return (
    <>
    
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={optionsArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="מקטים" />}
    />
    </>
  );
}
