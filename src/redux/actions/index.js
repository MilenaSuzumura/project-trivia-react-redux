export const NEW_USER = 'NEW_USER';
export const FIRST_RESPONSE_API = 'FIRST_RESPONSE_API';

export const newUser = (email, nome) => ({
  type: NEW_USER,
  email,
  nome,
});

export const receiveToken = (token) => ({
  type: FIRST_RESPONSE_API,
  token,
});

export const fetchFirstAPI = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => dispatch({ type: FIRST_RESPONSE_API, token: data.token }))
    .catch((error) => console.log(error));
};

export const fetchSecondAPI = (token) => async () => {
  const secondURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const response = await fetch(secondURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
