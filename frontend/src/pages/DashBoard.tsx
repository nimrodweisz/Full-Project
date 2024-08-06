import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  countItems,
  buildArrMakat,
  sumOfmakats,
  forGrid,
} from "../Utils/functions";
import BarChartComponent from "../components/BarData";
import Clock from "../components/Clock";
import GridData from "../components/GridData";
import { useDashboard } from "../store/cars-context";

interface DashBoardProps {
  children?: React.ReactNode;
}

export const DashBoard: React.FC<DashBoardProps> = ({children}) => {
  const { updateCarId,status, dashboardData } = useDashboard();
  
  // const [dashboardData, setDashboardData] = useState([]);
  const params = useParams();
  const ID = params.userId;
  console.log(ID);

  // useEffect(() => {
  //   fetch_dashboardData();
  // }, []);
  useEffect(() => {

    updateCarId(ID);
  }, []);
  useEffect(() => {
    
    fetch_dashboard();
  }, [params.userId]);

  const navigate = useNavigate();
  const fetch_dashboard = async () => {
    console.log(status)
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userIde: params.userId,
        }),
      });

      if (response.status === 401 ) {
        navigate("/login");
        return;
      }
      if (!response.ok) {
      } else {
        const data = await response.json();
        return "valid";
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
      navigate("/login");
      return "null";
    }
  };
  console.log(dashboardData);
  const realValue = countItems(dashboardData);
  const gridValues = forGrid(dashboardData);
  // let stringsOfLabels = buildArrMakat(dashboardData)
  const stringsOfLabels = buildArrMakat(dashboardData);
  const makats = sumOfmakats(dashboardData, stringsOfLabels);
  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '100vh' }}>
        <Box sx={{height:'50vh'}}>
          <Box sx={{ height: "35vh", alignContent: "left" }}>
            <Clock value={realValue} />
          </Box>

          <Box sx={{ height: "70vh", width: "100vh" }}>
            <BarChartComponent datasetData={makats} labels={stringsOfLabels} />
          </Box>
        </Box>

        
        <Box sx={{ width:'800px', position: 'absolute', bottom: '50px', left: '75%', transform: 'translateX(-50%)' }}>
          <GridData rows={gridValues}  />
        </Box>
        {/* <Box>
          <Card></Card>
        </Box> */}
      </Box>
      {children}
    </>
);
};
