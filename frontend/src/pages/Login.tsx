import React from 'react';
import { Grid, Paper, Input, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";
import Toast from "../toastStaff/Toast";
import useToast from "../toastStaff/useToast";
import { useState, useEffect } from "react";



export const Login: React.FC = () => {
  const location = useLocation();
  const { isOpen, showToast, text, textType, setIsOpen } = useToast();

  useEffect(() => {
    if (location.pathname === '/login')
      Cookies.remove('jwt');
  }, [location]);

  const navigate = useNavigate();
  const [pernr, setPernr] = useState<string>('8604191');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Matomo event tracking
    if (window._paq) {
      console.log('Matomo event tracking:', window._paq);
      window._paq.push(['trackEvent', 'Login', 'Click', 'Login button clicked']);
    } else {
      console.error('Matomo _paq is not defined');
    }
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pernr
        })
      });

      if (!response.ok) {
        showToast(`there is no user for the input ${pernr}`, "warning");
      } else {
        const data = await response.json();
        navigate(`/dashboard/${pernr}`);
        console.log(response);
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
          <form action="post">
            <Grid container alignItems="center" justifyContent="flex-end">
              <Grid item xs={9}>
                <Input type="text" value={pernr} onChange={(e) => setPernr(e.target.value)} placeholder="הכנס מספר אישי" required />
              </Grid>
              <Grid item xs={3}>
                <Button onClick={handleLogin} type="submit">הכנס</Button>
              </Grid>
            </Grid>
            <Toast message={text} type={textType} isOpen={isOpen} setIsOpen={setIsOpen} />
          </form>
        </Paper>
      </Grid>
    </>
  );
};
