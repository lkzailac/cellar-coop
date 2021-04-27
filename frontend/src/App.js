import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation'
import ItemsPage from './components/Items'
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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/items'>
            <ItemsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;
