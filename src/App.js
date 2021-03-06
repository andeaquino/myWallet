import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import UserContext from "./contexts/UserContext";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import AddEntry from "./pages/AddEntry/AddEntry";
import Stats from "./pages/Stats/Stats";

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <BrowserRouter>
      <ToastContainer />
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Switch>
          <Route exact path="/">
            {userInfo ? <Redirect to="/conta" /> : <Login />}
          </Route>
          <Route exact path="/cadastro">
            {userInfo ? <Redirect to="/conta" /> : <Register />}
          </Route>
          <Route exact path="/conta">
            {userInfo ? <Account /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/adicionar/:entryType">
            {userInfo ? <AddEntry /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/estatisticas">
            {userInfo ? <Stats /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
