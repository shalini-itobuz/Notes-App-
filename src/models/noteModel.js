import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, required: true },
},{timestamps:true});

// noteSchema.pre('save', function(next) {
//     const title = this.title.split(" ").map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(" ")
//     this.title = title
//     next()
// })

const Note = mongoose.model('Note', noteSchema);

export default Note;
