import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainlayout from './layouts/Mainlayout';
import Authlayout from './layouts/Authlayout';
import Accountpage from './pages/Accountpage';
import Accountspages from './pages/Accountspages';
import Applycardpage from './pages/Applycardpage';
import Applyloanpage from './pages/Applyloanpage';
import Cardspage from './pages/Cardspage';
import Loanspage from './pages/Loanspage';
import Transactionpage from './pages/Transactionpage';
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Landingpage from './pages/Landingpage';
import NotSecureRoute from './HOCs/NotSecureRoute';
import SecureRoute from './HOCs/SecureRoute';

const routesNoAuth = [{
  path: '/login',
  element: <Loginpage />,
  key: "login"
}, {
  path: '/signup',
  element: <Signuppage />,
  key: "signup"
}, {
  path: '/',
  element: <Landingpage />,
  key: "landing"
}];

const routesAuth = [{
  path: '/accounts',
  element: <Accountspages />,
  key: "accounts"
}, {
  path: '/accounts/account/:id', 
  element: <Accountpage />,
  key: "account"
}, {
  path: '/accounts/cards',
  element: <Cardspage />,
  key: "cards"
}, {
  path: '/accounts/getcards',
  element: <Applycardpage />,
  key: "applyCard"
}, {
  path: '/accounts/loans',
  element: <Loanspage />,
  key: "loans"
}, {
  path: '/accounts/getloan',
  element: <Applyloanpage />,
  key: "applyLoan"
}, {
  path: '/accounts/transactions',
  element: <Transactionpage />,
  key: "transactions"
}];

function App() {
  return (
    <BrowserRouter>
      {  
        <Routes key="authRoutes">
          <Route element={<Mainlayout />}>
            {routesAuth.map(SecureRoute)}
          </Route>
        </Routes>
      } 
      {
        <Routes key="noAuthRoutes">
          <Route element={<Authlayout />}>
            {routesNoAuth.map(NotSecureRoute)}
          </Route>
        </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
