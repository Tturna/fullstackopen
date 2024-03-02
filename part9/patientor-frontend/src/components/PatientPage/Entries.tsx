import { Entry } from "../../types";

const Entries = ({ entries }: { entries: Entry[]}) => {
    return(
        <div>
            {entries.map(e => (
                <div key={e.id}>
                    <p>{e.date} <i>{e.description}</i></p>
                    <ul>
                        {e.diagnosisCodes?.map(dc => (
                            <li key={dc}>{dc}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Entries;