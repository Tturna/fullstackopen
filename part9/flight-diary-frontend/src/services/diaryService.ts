import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000';

const getAll = async () => {
    return await axios.get(`${baseUrl}/api/diaries`);
}

const addEntry = async (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
    const response = await axios.post<DiaryEntry>(`${baseUrl}/api/diaries`, { ...newEntry});
    return response.data;
}

export default { getAll, addEntry };