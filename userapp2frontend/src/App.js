import { Switch, BrowserRouter,Route } from "react-router-dom";
import Userview from "./pages/userview";
import Useredit from "./pages/useredit";
import Deletepopup from "./pages/deletepopup";
function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/home" component={Userview}/>

        <Route path="/edit" component={Useredit}/>

        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
