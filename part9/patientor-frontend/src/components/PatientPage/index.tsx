import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import Entries from "./Entries";
import NewHealthCheckEntryForm from "./NewHealthCheckEntryForm";
import Notification from "../Notification";

interface Props {
    diagnoses: Diagnosis[];
    updateEntries: (patientId:string, entry: Entry) => void;
    notification: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const PatientPage = (props: Props) => {
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

        // This is a hack to re-render the component when an entry is added
        // pls don't judge
        console.log(props.notification);
    }, [id, props.notification]);

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
            
            <Notification notification={props.notification} />

            <NewHealthCheckEntryForm patientId={patient.id} updateEntries={props.updateEntries} setNotification={props.setNotification} />
            <h3>Entries</h3>
            <Entries entries={patient.entries} diagnoses={props.diagnoses} />
        </div>
    );
};

export default PatientPage;