import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ItemsPage from './components/ItemsPage';
import ItemDetail from './components/ItemDetail';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <div className='main-container'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' >
            <HomePage isLoaded={isLoaded}/>
          </Route>
          <Route exact path='/items'>
            <ItemsPage />
          </Route>
          <Route path='/items/:id'>
            <ItemDetail />
          </Route>
          <Route path='/users/:id'>
            <ProfilePage />
          </Route>
        </Switch>
      )}
      <Footer />
    </ div>
  );
}


export default App;
