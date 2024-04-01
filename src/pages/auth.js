//retrieves user info stored in local storage
function getCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null; 
  }
  
  export { getCurrentUser };

  