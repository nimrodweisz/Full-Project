import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import { useThemeContext } from '../store/theme-context';
import { useDashboard } from '../store/cars-context';

interface Props {

  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['הכנסת כלי', 'התנתקות', ]

export default function DrawerAppBar(props: Props) {
  const {dashboardData } = useDashboard();

  const context = useThemeContext();
  const { toggleColorMode, mode } = context;

  
    let location = useLocation()
    let managerB : Boolean= false;
    if(location.pathname === '/dashboard/8604191' || location.pathname === '/dashboard/manager'){
      managerB = true
    }
    const navigate = useNavigate();
    const goToDash = async (e:React.FormEvent)=>{
     
        e.preventDefault()
        if('/dashboard/manager'){
          navigate(`/dashboard/8604191`)
          
        }
      
     
      
    }
    const signOutHandler = async (e:React.FormEvent) =>{
        Cookies.remove('jwt')
        navigate('/login');


    }
    const handleSubmit = async (e:React.FormEvent) =>{
      navigate("/dashboard/manager")


  }


  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        
        <Toolbar>
        <Typography >
        {dashboardData.length  } :מספר כלים נוכחי במערכת
      </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
         
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
                

          </Typography>
          

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

         { managerB ? <Button onClick={handleSubmit} sx={{ color: '#fff' }}>
                הכנסת כלי
         </Button>: ''}
         <Button onClick={signOutHandler}  sx={{ color: '#fff' }}>
                התנתקות
         </Button>
         <Button onClick={goToDash} sx={{ color: '#fff' }}>
                דשבורד
         </Button>
         <IconButton onClick={toggleColorMode} color="inherit">
      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
        <Outlet/>
      </Box>
    </Box>
  );
}
