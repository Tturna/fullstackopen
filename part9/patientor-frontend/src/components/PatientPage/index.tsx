import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import Entries from "./Entries";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[]}) => {
    const [patient, setPatient] = useState<Patient>();
    const id = useParams().id as string;
    
    useEffect(() => {
        patients.getById(id)
        .then(resultPatient => {
            setPatient(resultPatient);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return(
        <div>
            <h2>{patient.name}</h2>
            <p>Gender: {patient.gender}</p>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <p>Date of birth: {patient.dateOfBirth}</p>

            <h3>Entries</h3>
            <Entries entries={patient.entries} diagnoses={diagnoses} />
        </div>
    );
};

export default PatientPage;