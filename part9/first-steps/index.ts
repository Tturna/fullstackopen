import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});