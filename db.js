const pg = require("pg");

const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/covidDB"
);

client.connect();

const sync = async () => {
	const SQL = `
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		DROP TABLE IF EXISTS global;
		DROP TABLE IF EXISTS us;

		CREATE TABLE global(
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			newConfirmed INT,
			newDeaths INT,
			newRecovered INT,
			totalConfirmed INT,
			totalDeaths INT,
			totalRecovered INT
		);

		CREATE TABLE us(
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			newConfirmed INT,
			newDeaths INT,
			newRecovered INT,
			totalConfirmed INT,
			totalDeaths INT,
			totalRecovered INT
		);`;

	await client.query(SQL);
};

const addGlobal = async (global) => {
	console.log(global);
	const SQL =
		"INSERT INTO global(newConfirmed, newDeaths, newRecovered, totalConfirmed, totalDeaths, totalRecovered) values($1, $2, $3, $4, $5, $6) returning *";
	return (
		await client.query(SQL, [
			global.NewConfirmed,
			global.NewDeaths,
			global.NewRecovered,
			global.TotalConfirmed,
			global.TotalDeaths,
			global.TotalRecovered,
		])
	).rows[0];
};

module.exports = {
	sync,
	addGlobal,
};
