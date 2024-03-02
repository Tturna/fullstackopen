import { useState } from "react";
import entriesService from "../../services/entries";
import { HospitalEntry, Entry } from "../../types";
import axios from "axios";

interface Props {
    patientId: string;
    updateEntries: (patientId: string, entry: Entry) => void;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    diagnosisCodes: string[];
}

const NewHospitalEntryForm = (props: Props) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [description, setDescription] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        const newEntry: Omit<HospitalEntry, 'id'> = {
            date,
            specialist,
            description,
            type: "Hospital",
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
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
            <h3>Add a new hospital entry</h3>
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
                    <label>discharge date</label>
                    <input type="date" value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} />
                </div>
                <div>
                    <label>discharge criteria</label>
                    <input value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default NewHospitalEntryForm;