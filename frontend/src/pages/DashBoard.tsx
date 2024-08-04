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

export const DashBoard: React.FC = () => {
  const { updateCarId, dashboardData } = useDashboard();
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

      if (response.status === 401) {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Box >
              <Clock value={realValue} />
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} >
            <BarChartComponent datasetData={makats} labels={stringsOfLabels} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{width:'40'}}>
            <GridData rows={gridValues} />
          </Grid>
        </Grid>
      </Box>
    </>
  );

};
