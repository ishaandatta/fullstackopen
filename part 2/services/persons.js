import axios from 'axios';

const base_url = 'http://localhost:3001/persons';

const getAll = () => {

    return (axios
        .get(base_url)
        .then(response => response.data))
}

const create = (newPersonObject) => {

    return (axios
        .post(base_url, newPersonObject)
        .then(response => response.data)
    )
}

const remove = (id) => {

    return (axios
        .delete(`${base_url}/${id}`)
        .then(response => response.data)
    )
}

const update = (personObject) => {

    return (axios
        .put(`${base_url}/${personObject.id}`, personObject)
        .then(response => response.data)
    )
}

export default {getAll, create, remove, update};
