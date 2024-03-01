import data from "../../data/diagnoses";
import { Diagnosis } from "../types";

function getAll(): Diagnosis[] {
    return data;
}

export default { getAll };