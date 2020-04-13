import http from '../http-common.js';

const getAllUser = () => {

    return http.get('users');
}

const getUserById = (id) => {

    return http.get('/users/' + id);
}
const createUser = (data) => {
    return http.post('/users', data);
}
const updateUser = (id, data) => {
    console.log("ABABAB");
    console.log(id);
    console.log("UPUPUP");
    return http.put('/users/' + id, data);
};

const deleteUser = id => {
    console.log(id);
    return http.delete(`/users/${id}`);
};

export default {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser

};