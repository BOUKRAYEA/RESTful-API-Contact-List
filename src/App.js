import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NabBar/NabBar";
import ContactList from "./components/ContactList/ContactList";
import AddContact from "./components/AddContact/AddContact";
import { Route } from "react-router-dom";
import EditContact from "./components/EditContact/EditContact";

function App() {
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    getContactList();
  }, []);

  const getContactList = () => {
    axios
      .get("http://localhost:4000/contacts")
      .then((res) => setContactList(res.data))
      .catch((err) => console.error(err));
  };
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route
        exact
        path="/"
        render={(props) => (
          <ContactList
            {...props}
            contactList={contactList}
            getContactList={getContactList}
          />
        )}
      />
      <Route
        exact
        path="/add_contact"
        render={(props) => (
          <AddContact {...props} getContactList={getContactList} />
        )}
      />
      <Route
        exact
        path="/edit_contact/:id"
        render={(props) => (
          <EditContact {...props} getContactList={getContactList} />
        )}
      />
    </div>
  );
}

export default App;
