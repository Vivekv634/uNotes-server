const User = require('../models/user.model');

const getAllNotes = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);
    if (user) {
        res.json(user.notes);
    } else {
        res.json({ error: "User Doesn't exists!" });
    }
}

const getNoteByID = async (req, res) => {
    const userID = req.userID;
    const noteID = req.params.noteID;
    const user = await User.findById(userID);
    if (user) {
        const note = user.notes.filter((note) => note._id == noteID);
        res.json(note);
    } else {
        res.json({ error: "User Doesn't exists!" });
    }
}

const createNote = async (req, res) => {
    const userID = req.userID;
    const { title, body } = req.body;
    const user = await User.findById(userID);
    if (user) {
        user.notes.push({ title, body });
        const notes = await user.save();
        if (notes) {
            res.json({ notes, success: "New Note Created!" });
        }
    } else {
        res.json({ error: "User Doesn't exists!" });
    }
}

const updateNote = async (req, res) => {
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
    res.json({ userNotes, success: "Note Updated!" });
}

const deleteNote = async (req, res) => {
    const userID = req.userID;
    const noteID = req.params.noteID;
    const userNotes = await User.findById(userID).select('notes');
    const filteredNotes = userNotes.notes.filter(note => note._id != noteID);
    userNotes.notes = [];
    filteredNotes.map((note) => {
        userNotes.notes.push(note);
    });
    await userNotes.save();
    res.json({ userNotes, success: "Note Deleted!" });
}

module.exports = { getAllNotes, getNoteByID, createNote, updateNote, deleteNote };