import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation'
import ItemsPage from './components/ItemsPage'
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' >
            <HomePage isLoaded={isLoaded}/>
          </Route>
          <Route path='/items'>
            <ItemsPage />
          </Route>
          <Route path='/users/:id'>
            <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
