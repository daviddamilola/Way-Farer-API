const mockUsers = {
  validUser: {
    email: 'dan@gmail.com',
    first_name: 'david',
    last_name: 'damilola',
    password: 'David20@$',
  },

  emptyUser: {
    email: undefined,
    first_name: undefined,
    last_name: undefined,
    password: undefined,
  },

  invalidUserEmail: {
    email: 'dangmail.com',
    first_name: 'david',
    last_name: 'damilola',
    password: 'David20@$',
  },

  invalidUserPassword: {
    email: 'dan@gmail.com',
    first_name: 'david',
    last_name: 'damilola',
    password: 'David',
  },

  invalidFirstName: {
    email: 'dan@gmail.com',
    first_name: 'david34',
    last_name: 'damilola',
    password: 'David',
  },

  invalidLastName: {
    email: 'dan@gmail.com',
    first_name: 'david',
    last_name: 'damilola56',
    password: 'David',
  },

  existingUser: {
    email: 'dan@gmail.com',
    password: 'David20@$',
  },

  wrongPasswordLogin: {
    email: 'dan@gmail.com',
    password: 'david20@$',
  },

  wrongEmailLogin: {
    email: 'daki@gmail.com',
    password: 'david20@$',
  },
};

export default mockUsers;
