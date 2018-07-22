const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then((user) => {
      response.status(200).json(user);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/restaurants', (request, response) => {
  database('restaurants').select()
    .then((restaurant) => {
      response.status(200).json(restaurant);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users/new', (request, response) => {
  const user = request.query;
  for (let requiredParameter of ['username', 'email', 'password']) {
    if (!user[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { username: <String>, email: <String>, password: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('users').insert(user, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// app.post('/api/v1/restaurants', (request, response) => {
//   const restaurant = request.query;
//   console.log(request.query);

// })

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000')
});