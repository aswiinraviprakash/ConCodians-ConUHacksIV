import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { ThemeProvider, createTheme } from '@mui/material';
import Router from "./router";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h6: {
      color: 'rgba(0, 0, 0, 0.7)',
    },
  },
});

function App() {
  return (
<ThemeProvider theme={theme}>
  <Router/>
</ThemeProvider>


  );
}

export default App;
