import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    date: { type: Date, required: true, default: Date.now },
    author: { type: String, required: true},
    content: { type: String, required: true },
    tags: {type: Array}
}, {collection: "post"});

postSchema.index({title: 'text', subtitle: 'text', content: 'text'});

export default mongoose.model('Post', postSchema);
