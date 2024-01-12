import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'

import {
  createTable,
  getRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from './db.js';

await createTable();
const app = express();

app.get('/recipes', async (req, res, next) => {
  try {
    const recipes = await getRecipes();
    res.json(recipes);
  } catch (err) {
    next(err);
  }
});

app.get('/recipes/:id', async (req, res, next) => {
  try {
    const recipe = await getRecipe(req.params.id);
    if (!recipe) {
      return res.sendStatus(404);
    }
    res.json(recipe);
  } catch (err) {
    next(err);
  }
});

app.post('/recipes', bodyParser.json(), async (req, res, next) => {
  try {
    const { name, description, url } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'name is required' });
    }
    const id = crypto.randomUUID();
    await createRecipe({ id, name, description, url });
    res.status(201).json({id, name, description, url});
  } catch (err) {
    next(err);
  }
});

app.delete('/recipes/:id', async (req, res, next) => {
  try {
    await deleteRecipe(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.put('/recipes/:id', bodyParser.json(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, url } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'id and name is required' });
    }
    await updateRecipe({ id, name, description, url });
    res.json({id, name, description, url});
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
