import React, { useState, useEffect } from 'react';
import { saveNote, fetchNotes, updateNote, deleteNote } from './api';
import './App.css';

function App() {
  // useState is creating a "memory slot" which uses the first variale as the current value and setVariable as the way to update the screen
  const [notes, setNotes] = useState([]); // A list to store all notes downloaded from the server
  const [inputText, setInputText] = useState(''); // Stores exactly what the user is typing in the box
  const [selectedTag, setSelectedTag] = useState('personal'); // Remembers which category (tag) is chosen
  const [searchTerm, setSearchTerm] = useState(''); // Remembers what the user is typing in the search bar
  const [showLibrary, setShowLibrary] = useState(false); // A switch (true/false) to hide or show the notes list
  const [editingId, setEditingId] = useState(null); // Stores the ID of a note if we are currently editing it

  // Fetches all notes from the API and saves them into the 'notes' memory state
  // const load loads the data, while async tells the browser to not freeze until it fetches the notes
  const load = async () => setNotes(await fetchNotes());
  
  // This runs automatically when the app starts: it loads notes and sets a 30-second timer to refresh
  useEffect(() => { 
    load(); // Initial load
    const i = setInterval(load, 30000); // 30-second "polling" timer
    return () => clearInterval(i); // Stops the timer if the app is closed to save memory
  }, []);

  // Handles the 'Add' or 'Update' button click
  const handleSave = async () => {
    if (!inputText.trim()) return; // Stop here if the user typed nothing but spaces

    if (editingId) {
      // If we have an editingId, find the old note and tell the API to UPDATE it
      const note = notes.find(n => n.id === editingId);
      await updateNote(editingId, inputText, note.date, selectedTag);
      setEditingId(null); // Clear the editing mode
    } else {
      // If we aren't editing, tell the API to CREATE a brand new note
      await saveNote(inputText, selectedTag);
    }
    setInputText(''); // Clear the input box so it's ready for a new note
    load(); // Refresh the list from the server to show the change
  };

  // Handles the 'Delete' button click
  const handleDelete = async (id) => {
    // Show a popup to make sure the user didn't click delete by mistake
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNote(id); // Tell the API to erase this specific ID
      load(); // Refresh the list so the card disappears
    }
  };

  // Create a filtered list: only keep notes that match the search text in the content or the tag
  const filteredNotes = notes.filter(note => 
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (note.tag && note.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- THE HTML (User Interface) ---
  return (
    <div className="library-container">
      {/* Top bar containing inputs and action buttons */}
      <div className="controls">
        {/* Main input for note content */}
        <input 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          placeholder="Note content..." 
        />
        
        {/* Dropdown for selecting the category */}
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="tag-select">
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="ideas">Ideas</option>
        </select>

        {/* Button text changes based on whether we are editing or adding */}
        <button onClick={handleSave} className="primary-btn">
          {editingId ? 'Update' : 'Add to Library'}
        </button>
        
        {/* Search bar input */}
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-input"
        />

        {/* Button to toggle the visibility of the whole library */}
        <button onClick={() => setShowLibrary(!showLibrary)} className="secondary-btn">
          {showLibrary ? 'Hide' : 'Display Notes'}
        </button>
      </div>

      {/* Only show this section if 'showLibrary' is true */}
      {showLibrary && (
        <div className="library-grid">
          {/* We copy the list, flip it (reverse), and loop through it (map) to create cards */}
          {[...filteredNotes].reverse().map(note => (
            <div className="note-card" key={note.id}>
              {/* Top part of card: tag and text */}
              <div className="card-top">
                <span className={`tag-badge ${note.tag || 'personal'}`}>{note.tag || 'personal'}</span>
                <p className="note-text">{note.content}</p>
              </div>
              {/* Bottom part: dates and action buttons */}
              <div className="card-bottom">
                <small className="note-date">
                  {note.date} {note.isEdited && `(ed: ${note.editDate})`}
                </small>
                <div className="button-group">
                  {/* Edit button: fills the input bar with the card's text to modify it */}
                  <button className="edit-btn" onClick={() => { 
                    setInputText(note.content); 
                    setSelectedTag(note.tag || 'personal');
                    setEditingId(note.id); 
                  }}>Edit</button>
                  
                  {/* Delete button: triggers the erasure logic */}
                  <button className="delete-btn" onClick={() => handleDelete(note.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default App;