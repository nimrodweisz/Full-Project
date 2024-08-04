import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { DashboardProvider } from './store/cars-context';
import { ThemeProviderWrapper } from './store/theme-context';

const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


root.render(

    <ThemeProviderWrapper>
     <DashboardProvider >
    
    <App />
    </DashboardProvider>
    
    </ThemeProviderWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

