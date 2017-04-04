import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    name: { type: String, required: true , unique: true},
    posts: { type: Array, required: true}
}, {collection: "tag"});

export default mongoose.model('Tag', postSchema);
