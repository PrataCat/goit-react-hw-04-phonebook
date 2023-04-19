const KEY_PHONEBOOK = 'contacts';

const getLocalStorage = () => {
  const contactsFromLS = localStorage.getItem(KEY_PHONEBOOK);
  const contactsArr = JSON.parse(contactsFromLS);
  return contactsArr;
};

export { getLocalStorage, KEY_PHONEBOOK };
