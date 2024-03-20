import Note from '../models/noteModel.js';

//Create a new note
export const createNote = async (req, res) => {
    try {
      const { title, description } = req.body;
      const existingNote = await Note.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
      if (existingNote) {
        return res.status(400).json({ status: 400, message: 'Note with the same title already exists.' });
      }
      const note = new Note({ title, description });
      await note.save();
      res.status(201).json({data:note,status:201,message:"Note created successfully"});
    } catch (error) {
      res.status(500).json({status:500, message: error.message });
    }
  };

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({data:notes, status:200, message:"All notes retrived successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ status:404, message: 'Note not found' });
    }
    res.json({data:note, status:200, message:"Note with particular ID retrived "});
  } catch (error) {
    res.status(500).json({ status:500, message: error.message });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({status:404, message: 'Note not found' });
    }
    note.title = title;
    note.description = description;
    await note.save();
    res.json({data:note, status:201 , message:"Note updated successfully"});
  } catch (error) {
    res.status(500).json({ status:500, message: error.message });
  }
};



// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(200).status(404).json({status:404 , message: 'Note not found' });
    }
  
    res.json({status:200, message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ status:500, message: error.message });
  }
};
