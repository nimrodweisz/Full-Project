import React, { useEffect, ChangeEvent } from "react";
import {
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

import { User } from "../Utils/thingsTypes";
import Toast from "../toastStaff/Toast";
import useToast from "../toastStaff/useToast";
import { useNavigate } from "react-router-dom";
import { getCarsMakats, getMakats } from "../Utils/functions";
import { useDashboard } from "../store/cars-context";
import Autocomplete from '../components/AutoComplete';
const SignUpPage: React.FC = () => {
  const { isOpen, showToast, text, textType, setIsOpen } = useToast();

  const { dashboardData, updateCarId } = useDashboard();
  const navigate = useNavigate();
  useEffect(() => {
    updateCarId("8604191");
  }, []);

  const fetch_method = async () => {
    const resData = await fetch("http://localhost:5000/dashboard/manager", {
      credentials: "include",
    });
    if (resData.status === 401 || resData.status === 403) {
      navigate(-1);
      return;
    } else {
      const data = await resData.json();

      setData(data);
    }
  };

  useEffect(() => {
    fetch_method();
  }, []);
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!gdud || !makat || !kashir || !carNumber) {
      alert("Please fill in all fields.");
      return;
    }
    const formData = {
      gdud: gdud,
      makat: makat,
      kshirot: kashir,
      carNumber: carNumber,
    };
    try {
      const response = await fetch("http://localhost:5000/addCar", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (response.status === 400) {
        console.log("problem");
        showToast("There is already car with the same number", "error");
      }
      if (response.status === 403) {
        showToast("the Length have to be 6 or 7 of the car number", "error");
      }
      if (response.status === 200) {
        showToast("user Succesfully Saved", "success");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
      return "null";
    }
  };

  const [gdud, setGdud] = React.useState("");
  const [makat, setMakat] = React.useState<string | null>("");
  const [kashir, setKashir] = React.useState("");
  const [data, setData] = React.useState<User[]>([]);
  const [carNumber, setCarNum] = React.useState("0");

  const handleGdudChange = (event: SelectChangeEvent<string>) => {
    setGdud(event.target.value);
  };
  const handleKshirot = (event: SelectChangeEvent<string>) => {
    setKashir(event.target.value);
  };
  const handleMakatChange = (event: SelectChangeEvent<string>) => {
    setMakat(event.target.value);
  };
  const handlePernrChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVal = String(event.target.value);
    if (/[^0-9]/.test(newVal)) {
    } else {
      setCarNum(newVal);
    }
  };

 const makats = getMakats(dashboardData)

  return (
    <>
      <form action="post">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >

          <InputLabel sx={{ textAlign: "center" }}>בחר גדוד</InputLabel>
          <Select
            required
            value={gdud}
            onChange={handleGdudChange}
            inputProps={{ "aria-label": "Country" }}
          >
            {data.map((item) => {
              return (
                <MenuItem value={item.gdud} key={JSON.stringify(item._id)}>
                  {item.gdud}
                </MenuItem>
              );
            })}
          </Select>
          <InputLabel sx={{ textAlign: "center" }}> בחר מקט</InputLabel>
          
          <Autocomplete optionsArray={makats} onChange={(event,value) =>{
            setMakat(value)
          }}/>
            
          
          <InputLabel sx={{ textAlign: "center" }}>בחר כשירות</InputLabel>
          <Select required onChange={handleKshirot} value={kashir}>
            <MenuItem key={"kashir"} value={"1"}>
              כשיר
            </MenuItem>
            <MenuItem key={"notKashir"} value={"0"}>
              לא כשיר
            </MenuItem>
          </Select>
          <InputLabel sx={{ textAlign: "center" }}>בחר מספר רכב</InputLabel>
          <TextField
            required
            type="text"
            onChange={handlePernrChange}
          ></TextField>

          <Button variant="contained" onClick={handleSubmit}>
            הכנס רכב
          </Button>
        </Box>
      </form>
      <Toast
        message={text}
        type={textType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {console.log(makats)}
    </>
  );
};

export default SignUpPage;
