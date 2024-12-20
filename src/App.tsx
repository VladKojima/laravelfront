import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Button, Container, ThemeProvider, Toolbar } from '@mui/material';
import { Login } from '@mui/icons-material';
import { LoginPage } from './pages/login';
import { theme } from './theme';
import { RegisterPage } from './pages/register';
import { MainPage } from './pages/main';
import { DishesPage } from './pages/dishes';
import { Page } from './components/page';
import { ReservationForm } from './pages/reservation';
import { HallsPage } from './pages/halls';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import { ReservationStatus } from './pages/reservationStatus';
import { Redirector } from './pages/redirector';
import { useState } from 'react';
import { PaymentContext } from './utils/contexts';
import { useOnMount } from './hooks/extendedUseEffect';

function App() {
  const [check, setCheck] = useState(false);

  useOnMount(() => {
    if (localStorage.getItem('checkId'))
      setCheck(true);
  });

  return (
    <PaymentContext.Provider value={[check, setCheck]}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <Router>
            <AppBar sx={{ minHeight: "80px", display: 'grid', gridTemplateColumns: "1fr 5fr 1fr", marginBottom: 5 }} position='static'>
              <Container sx={{ gridColumn: 2, textAlign: "center", alignContent: "center", ">*": { margin: "5px 5px" } }}>
                <Button variant='contained' color='secondary' component={Link} to="/">Главная</Button>
                <Button variant='contained' color='secondary' component={Link} to="/dishes">Блюда</Button>
                <Button variant='contained' color='secondary' component={Link} to="/halls">Залы</Button>
                <Button variant='contained' color='secondary' component={Link} to="/preservation">Бронирование</Button>
              </Container>
              <Toolbar sx={{ justifyContent: "end" }}>
                <Button
                  variant='contained'
                  color='secondary'
                  endIcon={<Login />}
                  component={Link}
                  to={"/login"}
                >
                  Вход/Регистрация
                </Button>
              </Toolbar>

            </AppBar>
            <Container>
              <Page>
                {check
                  ? <Routes>
                    <Route path="/preservation/status" element={<ReservationStatus />} />
                    <Route path="/*" element={<Redirector />} />
                  </Routes>
                  : <Routes>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dishes" element={<DishesPage />} />
                    <Route path="/halls" element={<HallsPage />} />
                    <Route path="/preservation" element={<ReservationForm />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/*" element={<Redirector />} />
                  </Routes>
                }

              </Page>

            </Container>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </PaymentContext.Provider>
  );
}

export default App;
