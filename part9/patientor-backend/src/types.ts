export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface BaseEntry {
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

export interface SickLeave {
    startDate: string,
    endDate:  string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string
    sickLeave?: SickLeave
}

export interface Discharge {
    date: string,
    criteria: string
}

export interface HospitalEntry extends BaseEntry{
    type: "Hospital",
    discharge: Discharge
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryData = UnionOmit<Entry, 'id'>;

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