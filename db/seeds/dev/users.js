
exports.seed = function (knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('restaurants').del()
    .then(() => knex('users').del())

    .then(() => {
      return Promise.all([

        knex('users').insert({
          username: 'Tory', email: 'rfd123@aol.com', password: 'taco'
        }, 'id')
          .then(user => {
            return knex('restaurants').insert([
              { rating: 6.2, notes: 'pulled pork sandwich, mac and cheese, baked beans', date: 'July 21', user_id: user[0], restaurant_name: 'Moes' }
            ])
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
