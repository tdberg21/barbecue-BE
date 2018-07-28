const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next()
});

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  next()
})

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

app.post('/api/v1/users', async (request, response) => {
  const guest = request.body;
  try {
    const users = await database('users').select()
    console.log('trying')
    const validation = users.find(user => {
      return (user.email === guest.email) && (user.password === guest.password)
    })
    response.status(201).json({ username: validation.username, id: validation.id })
  } catch (error) {
    console.log(error)
    response.status(500).json({'Incorrect email or password': error})
  }
})

app.post('/api/v1/restaurants', (request, response) => {
  console.log(request.body)
 const restaurant = request.query;
    for (let requiredParameter of ['rating', 'notes', 'date', 'user_id', 'restaurant_name', 'meal', 'yelpId']) {
      if (!restaurant[requiredParameter]) {
        return response
          .status(422)
          .send({
            error: `You're missing a "${requiredParameter}" property.`});
      }
    }
    
  database('restaurants').insert(restaurant, 'id')
    .then(restaurant => {
      response.status(201).json({ id: restaurant[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/restaurants/:id', async (request, response) => {
  const id = parseInt(request.params.id)
  try {
    const restaurants = await database('restaurants').select()
    const userFaves = restaurants.filter(restaurant => restaurant.user_id === id)
    response.status(200).json(userFaves)
  } catch (error) {
    response.status(500).json(error)
  }
});

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000')
});