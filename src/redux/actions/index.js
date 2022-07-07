export const ADD_USER = 'ADD_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SCORE_VALUE = 'SCORE_VALUE';

export const addUser = (email, username) => ({
  type: ADD_USER,
  email,
  username,
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const fetchToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const scoreValue = (score, assertion) => ({
  type: SCORE_VALUE,
  score,
  assertion,
});
