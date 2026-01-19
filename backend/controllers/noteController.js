const Note = require('../models/Note');
const mongoose = require('mongoose');

// Mock data storage for when DB is down
let mockNotes = [];

// Helper to check if DB is connected
const isDbConnected = () => mongoose.connection.readyState === 1;

// Get all notes
exports.getNotes = async (req, res) => {
    try {
        if (!isDbConnected()) {
            return res.status(200).json(mockNotes);
        }
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a note
exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    try {
        if (!isDbConnected()) {
            const newNote = { _id: Date.now().toString(), title, content, createdAt: new Date() };
            mockNotes.unshift(newNote);
            return res.status(201).json(newNote);
        }
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a note
exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        if (!isDbConnected()) {
            const index = mockNotes.findIndex(n => n._id === id);
            if (index === -1) return res.status(404).json({ message: 'Note not found' });
            mockNotes[index] = { ...mockNotes[index], title, content };
            return res.status(200).json(mockNotes[index]);
        }
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isDbConnected()) {
            mockNotes = mockNotes.filter(n => n._id !== id);
            return res.status(200).json({ message: 'Note deleted successfully' });
        }
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
