import { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface EntriesProps {
    entries: Entry[],
    diagnoses: Diagnosis[]
}

const entryStyle = {
    margin: "10px auto",
    padding: "0 5px 5px",
    border: "1px solid black",
    borderRadius: "5px"
};

const Entries = (props: EntriesProps) => {
    return(
        <div>
            {props.entries.map(e => (
                <div key={e.id} style={entryStyle}>
                    <p>{e.date}</p>
                    <i>{e.description}</i>
                    <ul>
                        {e.diagnosisCodes?.map(dc => (
                            <li key={dc}>{dc} {props.diagnoses.find(d => d.code === dc)?.name}</li>
                        ))}
                    </ul>
                    <EntryDetails entry={e} />
                </div>
            ))}
        </div>
    );
};

export default Entries;