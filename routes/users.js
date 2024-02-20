const express = require('express');

const { getUsersAll, getUserById, updateUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getUsersAll);
router.get('/:id', getUserById);
router.patch('/:id', updateUser);

module.exports = router;
