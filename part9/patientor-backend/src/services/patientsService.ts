import { v1 as uuid } from 'uuid';
import data from "../../data/patients";
import { Patient, PatientData, Gender, Entry } from "../types";

function getAll(): Patient[] {
    return data;
}

function getById(id: string): Patient | undefined {
    return data.find(d => d.id === id);
}

function validatePatientData(patientData: unknown): PatientData {
    function isObject(data: unknown): data is object {
        return typeof data === 'object';
    }

    if (!patientData || !isObject(patientData)) {
        throw new Error('Incorrect or missing data');
    }

    function isString(data: unknown): data is string {
        return typeof data === 'string' || data instanceof String;
    }

    function isDate(data: string): boolean {
        return Boolean(Date.parse(data));
    }

    function isGender(data: string): boolean {
        const genders = Object.values(Gender).map(g => g.toString().toLowerCase());
        return genders.includes(data);
    }

    function isEntries(data: unknown[]): data is Entry[] {
        if (data.length == 0) return true;

        return data.every(e => {
            if (!e) return false;
            if (typeof e !== 'object') return false;
            if (!('type' in e)) return false;
            return isString(e.type);
        });
    }

    if ('name' in patientData &&
        'dateOfBirth' in patientData &&
        'ssn' in patientData &&
        'gender' in patientData &&
        'occupation' in patientData &&
        'entries' in patientData
    ) {
        if (!isString(patientData.name)) {
            throw new Error('Invalid name');
        }

        if (!isString(patientData.dateOfBirth) || !isDate(patientData.dateOfBirth)) {
            throw new Error('Invalid date of birth');
        }

        if (!isString(patientData.ssn)) {
            throw new Error('Invalid SSN');
        }

        if (!isString(patientData.gender) || !isGender(patientData.gender)) {
            throw new Error('Invalid gender');
        }

        if (!isString(patientData.occupation)) {
            throw new Error('Invalid occupation');
        }

        if (!Array.isArray(patientData.entries) || !isEntries(patientData.entries)) {
            throw new Error('Invalid entries');
        }

        const validated: PatientData = {
            name: patientData.name,
            dateOfBirth: patientData.dateOfBirth,
            ssn: patientData.ssn,
            gender: patientData.gender,
            occupation: patientData.occupation,
            entries: patientData.entries
        };

        return validated;
    }

    throw new Error('Missing parameters');
}

function addPatient(patientData: PatientData): Patient {
    const newPatient: Patient = {
        id: uuid(),
        ...patientData
    };

    data.push(newPatient);

    return newPatient;
}

export default { getAll, getById, addPatient, validatePatientData };