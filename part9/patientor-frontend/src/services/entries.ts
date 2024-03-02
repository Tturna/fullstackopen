import axios from 'axios';
import { Entry, EntryData } from '../types';
import { apiBaseUrl } from '../constants';

const create = async (patientId: string, entryData: EntryData): Promise<Entry> => {
    const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        entryData
    );

    return data;
};

export default {
    create
};