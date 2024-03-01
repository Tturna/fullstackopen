import express from 'express';
import cors from 'cors';

import diagnosesRouter from './routes/diagnosesRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});