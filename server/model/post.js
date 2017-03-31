import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: { type: String, required: true, unique: true }
}, {collection: "post"});

export default mongoose.model('Post', postSchema);
