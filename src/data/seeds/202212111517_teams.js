module.exports = {
  seed: async (knex) => {
    await knex('teams').delete();

    await knex('teams').insert([{
        id: 1,
        name: 'BBC Panters Baasrode',
        userId: 1
      },
      {
        id: 2,
        name: 'Okapi Aalst',
        userId: 1
      },
      {
        id: 3,
        name: 'Telenet Oostende',
        userId: 1
      },
      {
        id: 4,
        name: 'Kangoeroes Basket Mechelen',
        userId: 2
      },
      {
        id: 5,
        name: 'Antwerp Giants',
        userId: 2
      },
    ])
  },
};