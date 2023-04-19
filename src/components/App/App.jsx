import { useState, useEffect } from 'react';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { nanoid } from 'nanoid';
import { getLocalStorage, KEY_PHONEBOOK } from '../../utils/Utils';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import cssApp from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(getLocalStorage());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY_PHONEBOOK, JSON.stringify(contacts));
  }, [contacts]);

  const saveContact = (userName, userNumber) => {
    if (contacts.some(el => el.name === userName)) {
      NotificationManager.info(`${userName} is already in contacts.`);
    } else {
      setContacts(prevState => [
        { name: userName, number: userNumber, id: nanoid() },
        ...prevState,
      ]);
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContactsList = () => {
    const normalizedFilter = filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className={cssApp['container']}>
      <h1>Phonebook</h1>
      <ContactForm saveContactFunc={saveContact} />
      <h2>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      <ContactList
        contacts={filterContactsList()}
        onDeleteContact={deleteContact}
      />
      <NotificationContainer />
    </div>
  );
};

export default App;
