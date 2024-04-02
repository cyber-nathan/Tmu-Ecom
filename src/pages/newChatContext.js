import { useEffect, useState } from 'react';

// Function to load chat context from local storage
const loadChatContext = () => {
  const storedContext = localStorage.getItem('chatContext');
  return storedContext ? JSON.parse(storedContext) : null;
};

// Function to save chat context to local storage
const saveChatContext = (context) => {
  localStorage.setItem('chatContext', JSON.stringify(context));
};

// Custom hook to manage chat context
const useChatContext = () => {
  const [chatContext, setChatContext] = useState(loadChatContext());

  // Function to select a contact and update chat context
  const selectContact = (currentUser, contactUser) => {
    const newChatContext = {
      user: contactUser,
      chatId: currentUser.uid > contactUser.uid
        ? currentUser.uid + contactUser.uid
        : contactUser.uid + currentUser.uid,
    };
    setChatContext(newChatContext);
    saveChatContext(newChatContext);
  };

  // Load chat context from local storage on mount
  useEffect(() => {
    setChatContext(loadChatContext());
  }, []);

  return [chatContext, selectContact];
};

export default useChatContext;
