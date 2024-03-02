import { useState } from "react";
import entriesService from "../../services/entries";
import { Entry, OccupationalHealthcareEntry } from "../../types";
import axios from "axios";

interface Props {
    patientId: string;
    updateEntries: (patientId: string, entry: Entry) => void;
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    diagnosisCodes: string[];
}

const NewOccupationalHealthcareEntryForm = (props: Props) => {
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [description, setDescription] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
            date,
            specialist,
            description,
            type: "OccupationalHealthcare",
            employerName
        };

        if (diagnosisCodes.length > 0) {
            newEntry.diagnosisCodes = diagnosisCodes;
        }

        if (sickLeaveStartDate && sickLeaveEndDate) {
            newEntry.sickLeave = {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate
            };
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
            <h3>Add a new occupational healthcare entry</h3>
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
                    <label>employer name</label>
                    <input value={employerName} onChange={e => setEmployerName(e.target.value)} />
                </div>
                <div>
                    <label>sick leave start date</label>
                    <input type="date" value={sickLeaveStartDate} onChange={e => setSickLeaveStartDate(e.target.value)} />
                </div>
                <div>
                    <label>sick leave end date</label>
                    <input type="date" value={sickLeaveEndDate} onChange={e => setSickLeaveEndDate(e.target.value)} />
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default NewOccupationalHealthcareEntryForm;