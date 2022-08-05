const newUser = (email, nome) => ({
  type: 'NEW_USER',
  email,
  nome,
});

export default newUser;
