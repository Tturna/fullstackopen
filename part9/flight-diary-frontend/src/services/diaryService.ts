import axios from "axios";

const baseUrl = 'http://localhost:3000';

const getAll = async () => {
    return await axios.get(`${baseUrl}/api/diaries`);
}

export default { getAll };