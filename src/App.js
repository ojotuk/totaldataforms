import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import LandingPension from "./components/LandingPension";
import LandingNHF from "./components/LandingMisc";
import Admin from "./components/Admin";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/pension" exact component={LandingPension}></Route>
        <Route path="/nhf" exact component={LandingNHF}></Route>
        <Route path="/admin" exact component={Admin}></Route>
      </Switch>
    </div>
  );
}

export default App;
