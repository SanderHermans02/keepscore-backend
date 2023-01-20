module.exports = {
	seed: async (knex) => {
		await knex('matches').delete();

		await knex('matches').insert([{
				id: 1,
				homeTeamId: 1,
				awayTeamId: 2,
				homeScore: 85,
				awayScore: 78,
				date: new Date(2022, 12, 8),
				userId: 1
			},
			{
				id: 2,
				homeTeamId: 1,
				awayTeamId: 3,
				homeScore: 65,
				awayScore: 42,
				date: new Date(2022, 12, 13),
				userId: 1
			},
			{
				id: 3,
				homeTeamId: 4,
				awayTeamId: 5,
				homeScore: 78,
				awayScore: 65,
				date: new Date(2022, 12, 18),
				userId: 2
			},
		]);
	},
};