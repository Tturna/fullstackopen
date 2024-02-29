import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const inputHeightCm = Number(req.query.height);
    const inputWeightKg = Number(req.query.weight);

    if (!inputHeightCm || !inputWeightKg || isNaN(inputHeightCm) || isNaN(inputWeightKg)) {
        res.status(400).json({ error: 'Missing or non-number parameters' });
    }

    res.json({
        weight: inputWeightKg,
        height: inputHeightCm,
        bmi: calculateBmi(inputHeightCm, inputWeightKg)
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({ error: 'parameters missing' });
    }

    const tr: number = Number(target);

    if (isNaN(tr) || !Array.isArray(daily_exercises) || !daily_exercises.every(d => typeof d === 'number')) {
        res.status(400).json({ error: 'malformatted parameters' });
    }

    res.json(calculateExercises(daily_exercises as number[], tr));
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});