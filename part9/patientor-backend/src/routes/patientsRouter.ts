import express from 'express';
import patientsService from '../services/patientsService';
import { UnsensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getAll();
    const safePatients: UnsensitivePatient[] = patients.map(p => { return { ...p, ssn: undefined }; });
    res.json(safePatients);
});

export default router;