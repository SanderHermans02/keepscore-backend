module.exports = {
  seed: async (knex) => {
    await knex('teams').delete();

    await knex('teams').insert([{
        id: 1,
        name: 'BBC Panters Baasrode'
      },
      {
        id: 2,
        name: 'Okapi Aalst'
      },
      {
        id: 3,
        name: 'Telenet Oostende'
      },
      {
        id: 4,
        name: 'Kangoeroes Basket Mechelen'
      },
      {
        id: 5,
        name: 'Antwerp Giants'
      },
    ])
  },
};