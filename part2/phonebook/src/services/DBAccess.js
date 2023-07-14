import axios from "axios";

const baseUrl = "/api/persons";

const create = (entry) => {
    return(
        axios
            .post(baseUrl, entry)
            .then(response => response.data)
    )
}

const readAll = () => {
    return(
        axios
            .get(baseUrl)
            .then(response => response.data)
    )
}

const update = (id, newEntry) => {
    return(
        axios
            .put(`${baseUrl}/${id}`, newEntry)
            .then(response => response.data)
    )
}

const deleteEntry = (id) => {
    return(
        axios
            .delete(`${baseUrl}/${id}`)
            .then(response => response)
    )
}

export default { create, readAll, update, deleteEntry }