//TODO: add users mock data and endpoints
const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

const getUsers = (req, res) => {
  res.json(users);
};

const postNewUser = (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({message: 'bad request'});
  }
  const newUserId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  const newUser = {id: newUserId, ...req.body};
  users.push(newUser);
  res.status(201).json({message: 'new user added', user: newUser});
};

const getUserById = (req, res) => {
  console.log('getting user id:', req.params.id);
  const userFound = users.find((user) => user.id == req.params.id);
  if (userFound) {
    res.json(userFound);
  } else {
    res.status(404).json({message: 'user not found'});
  }
};

const loginUser = (req, res) => {
  const {username, password} = req.body;

  // Tarkistaa onko username ja password annettu
  if (!username || !password) {
    return res.status(400).json({message: 'username and password required'});
  }

  // Etsi käyttäjä
  const user = users.find(
    (credentials) =>
      credentials.username === username && credentials.password === password,
  );

  if (!user) {
    return res.status(401).json({message: 'invalid username or password'});
  }

  res.json({
    message: 'login succesful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

export {getUsers, postNewUser, getUserById, loginUser};
