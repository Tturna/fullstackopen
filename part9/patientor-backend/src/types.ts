export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Entry {

}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type UnsensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientData = Omit<Patient, 'id'>;

export enum Gender {
    male = 'Male',
    female = 'Female',
    other = 'Other'
}