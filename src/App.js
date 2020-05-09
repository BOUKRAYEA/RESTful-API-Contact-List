import React from 'react';
import NavBar from './components/NabBar/NabBar'
import ContactList from './components/ContactList/ContactList'
import AddContact from './components/AddContact/AddContact';
import { Route } from 'react-router-dom'
import EditContact from './components/EditContact/EditContact';
function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={ContactList} />
      <Route exact path="/add_contact" component={AddContact} />
      <Route exact path="/edit_contact/:id" component={EditContact} />
    </div>
  );
}

export default App;
