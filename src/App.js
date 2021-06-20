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
// import Commitment from "./components/commitment/pdf/Index"



// 
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/pension" exact component={LandingPension}></Route>
        <Route path="/nhf" exact component={LandingNHF}></Route>
        <Route path="/admin" exact component={Admin}></Route>
        <Route path="/admin" exact component={Admin}></Route>
        <Route path="/admin/applications" exact component={AdminCommiment}></Route>
        <Route path="/application/commitment/user/:profile" exact component={CommitmentProfile}></Route>
        <Route path="/commitment" exact component={Commitment}></Route>
      </Switch>
      <NotificationContainer />
    </div>
  );
}

export default App;
