import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
interface ComboBoxProps {
    optionsArray: string[];
    onChange: (event: React.SyntheticEvent<Element, Event>, value: string | null) => void; 
  }
  
export default function ComboBox({ optionsArray,onChange  }: ComboBoxProps) {
  
  
  return (
    <>
    
    <Autocomplete
      onChange={onChange}
      disablePortal
      id="combo-box-demo"
      options={optionsArray}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="מקטים" />}
    />
    </>
  );
}
