import React from "react";
import { Grid, Paper, Input, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Toast from "../toastStaff/Toast";
import useToast from "../toastStaff/useToast";
import { useState, useEffect } from "react";

export const Login: React.FC = () => {
  const location = useLocation();
  const { isOpen, showToast, text, textType, setIsOpen } = useToast();

  useEffect(() => {
    if (location.pathname === "/login") Cookies.remove("jwt");
  }, [location]);

  const navigate = useNavigate();
  const [pernr, setPernr] = useState<string>("8604191");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    
  
    // const timestamp = new Date().toISOString();
    // const uniqueClickID = Math.random().toString(36).substring(7);
  
    // // Matomo event tracking
    // window._paq.push([
    //   "trackEvent",
    //   "Login",
    //   "Click",
    //   `Login button clicked at ${timestamp}-${uniqueClickID}`,
    // ]);
  
    // console.log("Matomo event sent:", `Login button clicked at ${timestamp}-${uniqueClickID}`);
    

    // Helper function to delay navigation
  
    try {
      const response = await fetch("http://localhost:5000/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pernr,
        }),
      });
  
      if (!response.ok) {
        showToast(`There is no user for the input ${pernr}`, "warning");
      } else {
        if (!window._paq) {
          window._paq = [];
        }
        const data = await response.json();
        const {gdud} = data
        console.log('sssssssssssssssssssssssssss')
        console.log(gdud)
        console.log('sssssssssssssssssssssssssss')
        window._paq.push(['setCustomDimension', 2, gdud, 'action']); 
        window._paq.push(['trackPageView']); // Manually trigger a page view
  
  
        // Wait for 1 second to allow Matomo to process the event before navigation
        
        
        // Navigate to dashboard
        navigate(`/dashboard/${pernr}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };
      
  
  

  const paperStyle = {
    padding: 20,
    height: "15%",
    width: 260,
    margin: "50vh auto",
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h6" component="h2">
            ברוכים הבאים למערכת
          </Typography>
          <form>
            <Grid container alignItems="center" justifyContent="flex-end">
              <Grid item xs={9}>
                <Input
                  type="text"
                  value={pernr}
                  onChange={(e) => setPernr(e.target.value)}
                  placeholder="הכנס מספר אישי"
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <Button onClick={handleLogin} type="button">
                  הכנס
                </Button>
              </Grid>
            </Grid>
            <Toast
              message={text}
              type={textType}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </form>
        </Paper>
      </Grid>
    </>
  );
};
