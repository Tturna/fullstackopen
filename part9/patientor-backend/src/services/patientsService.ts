import data from "../../data/patients";
import { Patient } from "../types";

function getAll(): Patient[] {
    return data;
}

export default { getAll };