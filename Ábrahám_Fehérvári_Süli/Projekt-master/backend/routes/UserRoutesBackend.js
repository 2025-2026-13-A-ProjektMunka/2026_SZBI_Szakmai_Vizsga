const express = require('express');
const { getAllUsersBackend, getUserById, createUser, updateUser, deleteUser, deleteReservation } = require('../controllers/userControllersBackend.js');
const router = express.Router();

router.get('/', getAllUsersBackend);
router.get('/:id', getUserById)
router.post('/', createUser);
router.patch('/modosit/:id', updateUser);
router.delete('/torol/:id', deleteUser);
router.delete('/torol', deleteReservation);

module.exports = router;
