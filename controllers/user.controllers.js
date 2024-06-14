const User = require('../models/user.model');

const getAllNotes = async (req, res) => {
    try {
        const userID = req.userID;
        const user = await User.findById(userID);
        if (user) {
            res.status(200).json(user.notes);
        } else {
            res.status(400).json({ error: "User Doesn't exists!" });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const createNote = async (req, res) => {
    try {
        const userID = req.userID;
        const { title, body } = req.body;
        const user = await User.findById(userID);
        if (user) {
            user.notes.push({ title, body });
            const userData = await user.save();
            if (userData.notes) {
                res.status(200).json({ notes: userData.notes, success: "New Note Created!" });
            }
        } else {
            res.status(400).json({ error: "User Doesn't exists!" });
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const updateNote = async (req, res) => {
    try {
        const userID = req.userID;
        const noteID = req.params.noteID;
        const { title, body } = req.body;
        const userNotes = await User.findById(userID).select('notes');
        userNotes.notes.map((note) => {
            if (note._id == noteID) {
                note.title = title;
                note.body = body;
            }
        });
        await userNotes.save();
        res.status(200).json({ userNotes, success: "Note Updated!" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

const deleteNote = async (req, res) => {
    try {
        const userID = req.userID;
        const noteID = req.params.noteID;
        const userNotes = await User.findById(userID).select('notes');
        const updatedNotesArray = userNotes.notes.filter(note => note._id.toString() !== noteID);
        userNotes.notes = updatedNotesArray;
        await userNotes.save();
        res.status(200).json({ notes: userNotes.notes, success: "Note Deleted!" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports = { getAllNotes, createNote, updateNote, deleteNote };