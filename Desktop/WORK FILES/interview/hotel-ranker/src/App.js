import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Create from './components/Create';
import HotelDetails from './components/HotelDetails';
import HotelList from './components/HotelList';
import Edit from './components/Edit';
import GoogleMaps from './components/GoogleMaps';

function App() {
  return (
    <Router >
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HotelList />
        </Route>
        <Route  path="/hotel/create">
          <Create />
        </Route>
        <Route  path="/hotel/view/:id">
          <HotelDetails />
        </Route>
        <Route  path="/hotel/edit/:id">
          <Edit />
        </Route>
        <Route  path="/hotel/map">
          <GoogleMaps />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
