import express from 'express';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Hello World' });
});
