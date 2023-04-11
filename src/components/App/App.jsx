import React from 'react';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import cssApp from './App.module.css';

const KEY_PHONEBOOK = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLS = localStorage.getItem(KEY_PHONEBOOK);
    const contactsArr = JSON.parse(contactsFromLS);
    if (contactsArr) {
      this.setState({ contacts: contactsArr });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  saveContact = data => {
    const { name, number } = data;
    if (this.state.contacts.some(el => el.name === data.name)) {
      NotificationManager.info(`${data.name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [
          { name: name, number: number, id: nanoid() },
          ...prevState.contacts,
        ],
      }));
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContactsList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className={cssApp['container']}>
        <h1>Phonebook</h1>
        <ContactForm saveContactFunc={this.saveContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} changeFilter={this.changeFilter} />
        <ContactList
          contacts={this.filterContactsList()}
          onDeleteContact={this.deleteContact}
        />
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
