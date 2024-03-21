import Note from '../models/noteModel.js';

class mynoteController{
//Create a new note
async createNote (req, res)  {
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
async getAllNotes (req, res) {
  try {
    const notes = await Note.find();
    res.json({data:notes, status:200, message:"All notes retrived successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get note by ID
async getNoteById (req, res) {
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
 async updateNote (req, res) {
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
 async  deleteNote(req, res) {
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

//route search on title basis
async titleSearch(req, res) {
  try {
      const title = req.params.title;
      const notes = await Note.find({ title: { $regex: title, $options: 'i' } });
      res.status(200).json(notes);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

//get last 3 notes 
async lastThreeNotes (req, res)  {
  try {
      const notes = await Note.find().sort({ updatedAt: -1 }).limit(3);
      res.json({ data: notes, status: 200, message: 'Last three notes based on updated time retrieved successfully' });
  } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
  }
};
}

export default new mynoteController();