import "./App.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Admin from "./components/Admin";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/admin" exact component={Admin}></Route>
      </Switch>
    </div>
  );
}

export default App;
