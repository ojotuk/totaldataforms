import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LandingPension from "./components/LandingPension";
import LandingNHF from "./components/LandingMisc";
import Admin from "./components/Admin";
import AdminCommiment from "./components/dashboads/applications//Index";
import CommitmentProfile from "./components/dashboads/applications/commitment/Profile"
import Commitment from "./components/commitment/Index"
import {NotificationContainer} from "react-notifications"
import {GlobalContext} from './GlobalStore/GlobalProvider'
import { useContext } from "react";
import {Redirect} from "react-router-dom";
import Login from "./components/Login";
// import Commitment from "./components/commitment/pdf/Index"

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/panel', state: {from: props.location}}} />}
    />
  )
}

// 
function App() {
  const {islogged} = useContext(GlobalContext)
  // console.log(islogged)
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/pension" exact component={LandingPension}></Route>
        <Route path="/nhf" exact component={LandingNHF}></Route>
        <Route path="/panel" exact component={Login}></Route>
        <PrivateRoute authed={islogged} exact path='/admin' component={Admin} />
        <PrivateRoute authed={islogged} exact path='/admin/applications' component={AdminCommiment} />
        <PrivateRoute authed={islogged} exact path='/application/commitment/user/:profile' component={CommitmentProfile} />
        <Route path="/commitment" exact component={Commitment}></Route>
      </Switch>
      <NotificationContainer />
    </div>
  );
}

export default App;
