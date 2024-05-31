import fs from 'fs';

export default function updateUserData({ name, email, bio }) {
  const userDataString = fs.readFileSync('./pages/api/user.json', 'utf8');
  let userDataArray = [];

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    if (Array.isArray(userData)) {
      userDataArray = userData;
    } else {
      userDataArray = [userData];
    }
  }

  const newUser = { name, email, bio };
  userDataArray.push(newUser);

  fs.writeFileSync('./pages/api/user.json', JSON.stringify(userDataArray, null, 2));
}