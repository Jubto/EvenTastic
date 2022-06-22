import React from 'react';
import ContextProvider from './utils/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EvenTasticAppBar from './components/layout/AppBar';
import Footer from './components/layout/Footer';
import HomePage from './screens/HomePage';
import RegisterPage from './screens/RegisterPage';
import AccountPage from './screens/AccountPage';
import TagsPage from './screens/TagsPage';
import EventPage from './screens/EventPage';
import AdminPage from './screens/AdminPage';
import UnauthorizedPage from './screens/UnauthorizedPage';

function App() {
  return (
    <ContextProvider>
    <Router>
      <EvenTasticAppBar />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>
          <Route exact path='/account' element={<AccountPage/>}/>
          <Route exact path='/tags' element={<TagsPage/>}/>
          <Route exact path='/event:id' element={<EventPage/>}/>
          <Route exact path='/admin' element={<AdminPage/>}/>
          <Route exact path='/unauthorized' element={<UnauthorizedPage/>}/>
        </Routes>
      <Footer />
    </Router>
    </ContextProvider>
  );
}

export default App;
