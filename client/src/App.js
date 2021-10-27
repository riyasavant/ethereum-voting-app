import { Switch, BrowserRouter, Route } from 'react-router-dom';
import SnackbarProvider from 'react-simple-snackbar'
import Register from './pages/Register';
import Login from './pages/Login';
import Voting from './pages/Voting';

function App() {

  return (
      <SnackbarProvider>
        <BrowserRouter>
          <Switch>
            <Route component={Login} exact path="/" />
            <Route component={Register} exact path="/register" />
            <Route component={Voting} exact path="/voting" />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
  );
}

export default App;