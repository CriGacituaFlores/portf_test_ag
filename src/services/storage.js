const TOKENS = [
  'access_token',
  'refresh_token',
];
const USER = ['_id', 'role', 'avatar', 'firstName', 'lastName', 'username'];
const KEYS = TOKENS.concat(USER);

export const storeTokens = tokens => new Promise((resolve, reject) => {
  try {
    TOKENS.forEach((key, index) => {
      localStorage.setItem(key, String(tokens[key]));
      if (index === TOKENS.length - 1) {
        resolve(true);
      }
    });
  } catch (err) {
    reject(err);
  }
});

export const storeUser = user => new Promise((resolve, reject) => {
  try {
    USER.forEach((key, index) => {
      localStorage.setItem(key, String(user[key]));
      if (index === USER.length - 1) {
        resolve(true);
      }
    });
  } catch (err) {
    reject(err);
  }
});

export const retrieveCredentials = () => new Promise((resolve, reject) => {
  // multiGet
  try {
    const credentials = {};
    KEYS.forEach((key, index) => {
      credentials[key] = localStorage.getItem(key) !== 'undefined' ? localStorage.getItem(key) : null;
      if (index === KEYS.length - 1) {
        resolve(credentials);
      }
    });
  } catch (err) {
    reject(err);
  }
});

export const retrieveTokens = () => new Promise((resolve, reject) => {
  // multiGet
  try {
    const tokens = {};
    TOKENS.forEach((key, index) => {
      tokens[key] = localStorage.getItem(key) !== 'undefined' ? localStorage.getItem(key) : null;
      if (index === TOKENS.length - 1) {
        resolve(tokens);
      }
    });
  } catch (err) {
    reject(err);
  }
});

export const retrieveUser = () => new Promise((resolve, reject) => {
  // multiGet
  try {
    const user = {};
    USER.forEach((key, index) => {
      user[key] = localStorage.getItem(key) !== 'undefined' ? localStorage.getItem(key) : null;
      if (index === USER.length - 1) {
        resolve(user);
      }
    });
  } catch (err) {
    reject(err);
  }
});

export const clearCredentials = () => new Promise((resolve, reject) => {
  // multiRemove
  try {
    KEYS.forEach((key, index) => {
      localStorage.removeItem(key);
      if (index === KEYS.length - 1) {
        resolve(true);
      }
    });
  } catch (err) {
    reject(err);
  }
});
