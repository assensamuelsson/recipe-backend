import pg from 'pg';

const client = new pg.Client({
  connectionString: process.env.DATABASE_CONNECTION_STRING,
})

await client.connect();

export const createTable = async () => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      id varchar(255) PRIMARY KEY,
      name varchar(255) NOT NULL,
      description text,
      url varchar(255)
    );
  `);

}

export const getRecipes = async () => {
  const res = await client.query('SELECT * FROM recipes');
  return res.rows;
}

export const getRecipe = async (id) => {
  const res = await client.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return res.rows?.[0];
}

export const createRecipe = async ({ id, name, description, url }) => {
  await client.query(`
    INSERT INTO recipes (id, name, description, url)
    VALUES ($1, $2, $3, $4)
  `, [id, name, description, url]);
}

export const deleteRecipe = async (id) => {
  await client.query('DELETE FROM recipes WHERE id = $1', [id]);
}

export const updateRecipe = async ({ id, name, description, url }) => {
  await client.query(`
    UPDATE recipes
    SET name = $2, description = $3, url = $4
    WHERE id = $1
  `, [id, name, description, url]);
};