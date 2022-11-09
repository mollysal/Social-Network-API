const router = require('express').Router();

const {
    getUsers,
    getsingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require("../../controllers/userController")