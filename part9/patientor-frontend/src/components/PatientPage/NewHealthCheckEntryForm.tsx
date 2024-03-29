import { useState } from "react";
import { HealthCheckEntry, Entry } from "../../types";
import entriesService from "../../services/entries";
import axios from "axios";

interface Props {
    patientId: string;
    updateEntries: (patientId: string, entry: Entry) => void;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    diagnosisCodes: string[];
}

const NewHealthCheckEntryForm = (props: Props) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [description, setDescription] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        const newEntry: Omit<HealthCheckEntry, 'id'> = {
            date,
            specialist,
            description,
            type: "HealthCheck",
            healthCheckRating: Number(healthCheckRating)
        };

        if (diagnosisCodes.length > 0) {
            newEntry.diagnosisCodes = diagnosisCodes;
        }

        entriesService.create(props.patientId, newEntry)
        .then(addedEntry => {
            props.updateEntries(props.patientId, addedEntry);
            props.setNotification(`New entry added: ${addedEntry.description}`);
            setTimeout(() => {
                props.setNotification('');
            }, 5000);
        })
        .catch(error => {
            console.log(error);

            if (axios.isAxiosError(error) && error.response) {
                props.setNotification(`Failed to add entry: ${error.response.data.error}`);
                setTimeout(() => {
                    props.setNotification('');
                }, 5000);
            }
        });
    };

    const formStyle = {
        border: "2px dotted black",
        padding: "1em",
    };

    return (
        <div style={formStyle}>
            <h3>Add a new health check entry</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <label>specialist</label>
                    <input value={specialist} onChange={e => setSpecialist(e.target.value)} />
                </div>
                <div>
                    <label>description</label>
                    <input value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>diagnosis codes</label>
                    <select multiple size={3} onChange={e => setDiagnosisCodes(Array.from(e.target.selectedOptions, option => option.value))}>
                        {props.diagnosisCodes.map(code => <option key={code} value={code}>{code}</option>)}
                    </select>
                </div>
                <div>
                    <label>health check rating</label>
                    <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating('0')} />
                    <label>Healthy</label>
                    <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating('1')} />
                    <label>Low risk</label>
                    <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating('2')} />
                    <label>High risk</label>
                    <input type="radio" name="healthCheckRating" onChange={() => setHealthCheckRating('3')} />
                    <label>Critical risk</label>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default NewHealthCheckEntryForm;