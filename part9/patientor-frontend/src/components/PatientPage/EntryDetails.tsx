import { Entry } from "../../types";
import { HealthCheckRating } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry}) => {
    switch (entry.type) {
        case 'HealthCheck':
            return(
                <div>
                    Health Check
                    <p>Rating: {HealthCheckRating[entry.healthCheckRating]}</p>
                    <p>Specialist: {entry.specialist}</p>
                </div>
            );
        case 'Hospital':
            return(
                <div>
                    Hospital
                    <p>Discharged {entry.discharge.date},</p>
                    <p>reasoning: {entry.discharge.criteria}</p>
                    <p>Specialist: {entry.specialist}</p>
                </div>
            );
        case 'OccupationalHealthcare':
            return(
                <div>
                    Occupational Healthcare
                    <p>Employer: {entry.employerName}</p>
                    {entry.sickLeave ? <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null}
                    <p>Specialist: {entry.specialist}</p>
                </div>
            );
        default:
            assertNever(entry);
    }
};

export default EntryDetails;