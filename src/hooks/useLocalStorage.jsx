import { useState, useEffect } from 'react';

const KEY_PHONEBOOK = 'contacts';

const useLocalStorage = defaultValue => {
  const [data, setData] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem(KEY_PHONEBOOK)) ?? defaultValue
    );
  });

  useEffect(() => {
    window.localStorage.setItem(KEY_PHONEBOOK, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};

export { useLocalStorage, KEY_PHONEBOOK };
