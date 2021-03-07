import React from 'react'
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/Store'
import Search from './Components/Search'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CoinDetails from './Components/CoinDetails';
import WatchList from './Components/WatchList';


function App() {
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Search} />
            <Route path="/coin_details" exact component={CoinDetails} />
            <Route path='/watchlist' exact component={WatchList} />
          </Switch>
        </Router>
    </Provider>
  );
}

export default App;
