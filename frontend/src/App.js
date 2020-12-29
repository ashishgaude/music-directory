import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Songs from "./components/songs/Songs";
import SongDetails from "./components/songs/songDetails";

import ExitSvg from "./assets/exit.svg";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function logout() {
  localStorage.removeItem("auth.token");
  window.location.reload();
}

function ProtectedRoute(Comp, props) {
  const authToken = localStorage.getItem("auth.token");
  console.log("auth", authToken);
  if (authToken) return <Comp {...props} />;
  props.history.push("/login");
}

function App() {
  return (
    <div>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
      >
        <img onClick={logout} src={ExitSvg} width="40px" alt="" />
      </div>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/songs/:id"
            render={(props) => ProtectedRoute(SongDetails, props)}
          />
          <Route
            path="/songs"
            render={(props) => ProtectedRoute(Songs, props)}
          />
          <Redirect path="/" to="/songs" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
