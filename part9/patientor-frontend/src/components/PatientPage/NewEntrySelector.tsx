import { useState } from "react";
import { Entry, Diagnosis } from "../../types";

import NewHealthCheckEntryForm from "./NewHealthCheckEntryForm";
import NewHospitalEntryForm from "./NewHospitalEntryForm";
import NewOccupationalHealthcareEntryForm from "./NewOccupationalHealthcareEntryForm";

interface Props {
    patientId: string;
    updateEntries: (patientId: string, entry: Entry) => void;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    diagnoses: Diagnosis[];
}

const NewEntrySelector = (props: Props) => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const diagnosisCodes = props.diagnoses.map(diagnosis => diagnosis.code);

    return (
        <div>
            <h3>Select new entry type</h3>
            <button onClick={() => setSelectedType("HealthCheck")}>Health Check</button>
            <button onClick={() => setSelectedType("Hospital")}>Hospital</button>
            <button onClick={() => setSelectedType("OccupationalHealthcare")}>Occupational Healthcare</button>
            {selectedType === "HealthCheck" && <NewHealthCheckEntryForm patientId={props.patientId} updateEntries={props.updateEntries} setNotification={props.setNotification} diagnosisCodes={diagnosisCodes} />}
            {selectedType === "Hospital" && <NewHospitalEntryForm patientId={props.patientId} updateEntries={props.updateEntries} setNotification={props.setNotification} diagnosisCodes={diagnosisCodes} />}
            {selectedType === "OccupationalHealthcare" && <NewOccupationalHealthcareEntryForm patientId={props.patientId} updateEntries={props.updateEntries} setNotification={props.setNotification} diagnosisCodes={diagnosisCodes} />}
        </div>
    );
};

export default NewEntrySelector;