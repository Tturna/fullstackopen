import express from 'express';
import patientsService from '../services/patientsService';
import { UnsensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getAll();
    const safePatients: UnsensitivePatient[] = patients.map(p => { return { ...p, ssn: undefined }; });
    res.json(safePatients);
});

router.post('/', (req, res) => {
    try {
        const validatedData = patientsService.validatePatientData(req.body);
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