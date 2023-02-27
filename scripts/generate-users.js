const axios = require('axios');
const uuid = require('uuid').v4;
const fs = require('fs');

async function generateUsers() {
  const res = await axios.get('https://names.drycodes.com/500');
  const users = [];

  res.data.forEach(name => {
    const [firstName, lastName] = name.replace(/_/g, ' ').split(/ (.*)/s);
    users.push({
      id: uuid(),
      name: {id: uuid(), firstName, lastName},
    });
  });

  const json = JSON.stringify(users, null, 2);
  const unquoted = json.replace(/"([^"]+)": "([^"]+)"/g, "$1: '$2'");

  const codeStr = `export const users = ${unquoted};`;

  fs.writeFileSync('src/constants/users.js', codeStr, 'utf8');
}

generateUsers();
