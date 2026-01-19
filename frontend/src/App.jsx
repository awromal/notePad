import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${currentNoteId}`, { title, content });
        setIsEditing(false);
        setCurrentNoteId(null);
      } else {
        await axios.post(API_URL, { title, content });
      }
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setCurrentNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchNotes();
      } catch (err) {
        console.error('Error deleting note:', err);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentNoteId(null);
    setTitle('');
    setContent('');
  };

  return (
    <div className="container">
      <header>
        <h1>Smart Notepad</h1>
        <p>Your thoughts, organized and accessible.</p>
      </header>

      <div className="note-form">
        <h3>{isEditing ? 'Edit Note' : 'Create New Note'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your note here..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit">{isEditing ? 'Update Note' : 'Add Note'}</button>
            {isEditing && (
              <button type="button" onClick={handleCancel} style={{ background: '#64748b' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#64748b' }}>
            No notes yet. Start writing!
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="actions">
                <button className="btn-icon btn-edit" onClick={() => handleEdit(note)}>
                  Edit
                </button>
                <button className="btn-icon btn-delete" onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
