import { useState } from 'react';

const KEY_PHONEBOOK = 'contacts';

const useLocalStorage = defaultValue => {
  const [storageData, setStorageData] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem(KEY_PHONEBOOK)) ?? defaultValue
    );
  });

  return [storageData, setStorageData];
};

export { useLocalStorage, KEY_PHONEBOOK };
