//getting the database link from settings file clean it up
const DB_URL = import.meta.env.VITE_FIREBASE_URL.replace('.json', ''); 

//function to send a new note to the database
export const saveNote = async (text, tag) => {
  //creating a package containing the text, the tag, today's date, and a "not edited" flag
  const noteData = { 
    content: text, 
    tag: tag,
    date: new Date().toISOString().split('T')[0], 
    isEdited: false 
  };

  //sending the package to Firebase using POST (the "Create" command)
  const response = await fetch(`${DB_URL}.json`, { 
    method: 'POST', 
    body: JSON.stringify(noteData) //turning the package into text so it can travel to the database
  });

  //returning the result from the server
  return response.json();
};

//function to download all notes from the database
export const fetchNotes = async () => {
  //going to the database link and asking for the data
  const response = await fetch(`${DB_URL}.json`);
  
  //turning the downloaded text back into a JavaScript object
  const data = await response.json();

  //if there is data, turn the IDs and notes into a list, otherwise, return a blank list
  return data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
};

//function to update a note that already exists
export const updateNote = async (id, newText, originalDate, tag) => {
  //creating a new package with the updated text and the current date as the "edit date"
  const updatedData = { 
    content: newText, 
    tag: tag,
    date: originalDate, //keep the old creation date
    editDate: new Date().toISOString().split('T')[0], 
    isEdited: true 
  };

  //send the update to the specific note's ID using PUT (the "Edit" command)
  await fetch(`${DB_URL}/${id}.json`, { 
    method: 'PUT', 
    body: JSON.stringify(updatedData) 
  });
};

//function to delete a note forever
export const deleteNote = async (id) => {
  //send a message to the specific note's ID using DELETE (the "Erase" command)
  await fetch(`${DB_URL}/${id}.json`, { 
    method: 'DELETE' 
  });
};