const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const userAuth = require('../middlewares/user.auth');

router.get('/notes', userAuth.authenticate, userController.getAllNotes);
router.get('/notes/:noteID', userAuth.authenticate, userController.getNoteByID);
router.post('/notes/create', userAuth.authenticate, userController.createNote);
router.put('/notes/update/:noteID', userAuth.authenticate, userController.updateNote);
router.delete('/notes/delete/:noteID', userAuth.authenticate, userController.deleteNote);

module.exports = router;