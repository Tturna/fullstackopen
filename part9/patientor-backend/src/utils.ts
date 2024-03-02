import {
    PatientData,
    Entry,
    EntryData,
    BaseEntry,
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
    Gender,
    Discharge,
    SickLeave
} from "./types";

function isObject(data: unknown): data is object {
    return typeof data === 'object';
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

function isDischarge(data: unknown): data is Discharge {
    if (!data || !isObject(data)) return false;

    if ('date' in data && 'criteria' in data) {
        return isString(data.date) && isString(data.criteria);
    }

    return false;
}

function isSickLeave(data: unknown): data is SickLeave {
    if (!data || !isObject(data)) return false;

    if ('startDate' in data && 'endDate' in data) {
        return isString(data.startDate) && isString(data.endDate);
    }

    return false;

}

export function validatePatientData(patientData: unknown): PatientData {
    if (!patientData || !isObject(patientData)) {
        throw new Error('Incorrect or missing data');
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

// This is so messed up to do without a validation library
export function validateEntryData(entryData: unknown): EntryData {
    if (!entryData || !isObject(entryData)) {
        throw new Error('Incorrect or missing data');
    }

    if (!('type' in entryData)) {
        throw new Error('Missing type');
    }

    if ('description' in entryData &&
        'date' in entryData &&
        'specialist' in entryData
    ) {
        if (!isString(entryData.description)) {
            throw new Error('Invalid description');
        }

        if (!isString(entryData.date) || !isDate(entryData.date)) {
            throw new Error('Invalid date');
        }

        if (!isString(entryData.specialist)) {
            throw new Error('Invalid specialist');
        }

        const validatedBasics: Omit<BaseEntry, 'id'> = {
            description: entryData.description,
            date: entryData.date,
            specialist: entryData.specialist
        };

        if ('diagnosisCodes' in entryData) {
            if (!Array.isArray(entryData.diagnosisCodes)) {
                throw new Error('Invalid diagnosis codes');
            }

            if (!entryData.diagnosisCodes.every(c => isString(c))) {
                throw new Error('Invalid diagnosis codes');
            }

            validatedBasics.diagnosisCodes = entryData.diagnosisCodes;
        }

        switch (entryData.type) {
            case 'HealthCheck':
                if ('healthCheckRating' in entryData) {
                    if (typeof entryData.healthCheckRating !== 'number' || isNaN(entryData.healthCheckRating) || entryData.healthCheckRating < 0 || entryData.healthCheckRating > 3) {
                        throw new Error('Invalid health check rating');
                    }

                    const validated: Omit<HealthCheckEntry, 'id'> = {
                        ...validatedBasics,
                        type: 'HealthCheck',
                        healthCheckRating: entryData.healthCheckRating
                    };

                    return validated;
                }
                break;

            case 'Hospital':
                if ('discharge' in entryData) {
                    if (!isDischarge(entryData.discharge)) {
                        throw new Error('Invalid discharge');
                    }

                    const validated: Omit<HospitalEntry, 'id'> = {
                        ...validatedBasics,
                        type: 'Hospital',
                        discharge: entryData.discharge
                    };

                    return validated;
                }
                break;

            case 'OccupationalHealthcare':
                if ('employerName' in entryData) {
                    if (!isString(entryData.employerName)) {
                        throw new Error('Invalid employer name');
                    }

                    const validated: Omit<OccupationalHealthcareEntry, 'id'> = {
                        ...validatedBasics,
                        type: 'OccupationalHealthcare',
                        employerName: entryData.employerName
                    };

                    if ('sickLeave' in entryData) {
                        if (!isSickLeave(entryData.sickLeave)) {
                            throw new Error('Invalid sick leave');
                        }

                        validated.sickLeave = entryData.sickLeave;
                    }

                    return validated;
                }
                break;

            default:
                throw new Error('Invalid type');
        }
    }

    throw new Error('Missing parameters');
}