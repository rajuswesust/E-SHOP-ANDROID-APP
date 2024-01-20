const express = require('express');
const { getUsers, getUser, postSignUp, postLogIn, postUser, updateUser, getUsersCount, deleteUser } = require('../controllers/users.controller');

const router = express.Router();

router.get("/", getUsers);

router.get('/:id', getUser);

router.get('/get/count', getUsersCount);

router.post('/', postUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser)

router.post('/signup', postSignUp);

router.post('/login', postLogIn);

module.exports = router;