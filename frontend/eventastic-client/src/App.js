import React from 'react';
import ContextProvider from './utils/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EvenTasticAppBar from './components/layout/AppBar';
import HomePage from './screens/HomePage';
import RegisterPage from './screens/RegisterPage';
import AccountPage from './screens/AccountPage';
import TagsPage from './screens/TagsPage';
import EventPage from './screens/EventPage';
import CreateEventPage from './screens/CreateEventPage';
import AdminVenuePage from './screens/AdminVenuePage';
import ApproveHostPage from './screens/ApproveHostPage';
import UnauthorizedPage from './screens/UnauthorizedPage';
import Footer from './components/layout/Footer';
import LogInModal from './components/account/LogInModal';

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
          <Route exact path='/event/:id' element={<EventPage/>}/>
          <Route exact path='/create-event' element={<CreateEventPage/>}/>
          <Route exact path='/admin/createVenues' element={<AdminVenuePage/>}/>
          <Route exact path='/admin/approveHosts' element={<ApproveHostPage/>}/>
          <Route exact path='/unauthorized' element={<UnauthorizedPage/>}/>
        </Routes>
      <Footer />
      <LogInModal/>
    </Router>
    </ContextProvider>
  );
}

export default App;
