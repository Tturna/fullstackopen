import { Diagnosis, Entry } from "../../types";

interface EntriesProps {
    entries: Entry[],
    diagnoses: Diagnosis[]
}

const Entries = (props: EntriesProps) => {
    return(
        <div>
            {props.entries.map(e => (
                <div key={e.id}>
                    <p>{e.date} <i>{e.description}</i></p>
                    <ul>
                        {e.diagnosisCodes?.map(dc => (
                            <li key={dc}>{dc} {props.diagnoses.find(d => d.code === dc)?.name}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Entries;