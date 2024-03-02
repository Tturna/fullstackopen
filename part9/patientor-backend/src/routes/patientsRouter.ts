import express from 'express';
import patientsService from '../services/patientsService';
import { validatePatientData, validateEntryData } from '../utils';
import { UnsensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getAll();
    const safePatients: UnsensitivePatient[] = patients.map(p => { return { ...p, ssn: undefined }; });
    res.json(safePatients);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const result = patientsService.getById(id);

    if (!result) {
        res.sendStatus(404);
    }

    res.json(result);
});

router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;
        const validatedData = validateEntryData(req.body);
        res.json(patientsService.addEntry(id, validatedData));
    } catch (error) {
        let errorMessage = 'Error adding patient. ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }

        console.log(errorMessage);
        res.status(400).json({ error: errorMessage });
    }
});

router.post('/', (req, res) => {
    try {
        const validatedData = validatePatientData(req.body);
        res.json(patientsService.addPatient(validatedData));
    } catch (error) {
        let errorMessage = 'Error adding patient. ';
        if (error instanceof Error) {
            errorMessage += error.message;
        }

        console.log(errorMessage);
        res.status(400).json({ error: errorMessage });
    }
});

export default router;