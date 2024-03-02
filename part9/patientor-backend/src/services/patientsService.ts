import { v1 as uuid } from 'uuid';
import data from "../../data/patients";
import { Patient, PatientData, Entry, EntryData } from "../types";

function getAll(): Patient[] {
    return data;
}

function getById(id: string): Patient | undefined {
    return data.find(d => d.id === id);
}

function addPatient(patientData: PatientData): Patient {
    const newPatient: Patient = {
        id: uuid(),
        ...patientData
    };

    data.push(newPatient);

    return newPatient;
}

function addEntry(patientId: string, entryData: EntryData): Entry {
    const patient = data.find(patient => patient.id === patientId);

    if (!patient) {
        throw new Error(`Can not add entry. No patient with id ${patientId}`);
    }

    const newEntry: Entry = { id: uuid(), ...entryData};
    patient.entries.push(newEntry);

    return newEntry;
}

export default { getAll, getById, addPatient, addEntry };