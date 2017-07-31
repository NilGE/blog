import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    datetime: { type: String, required: true },
    author: { type: String, required: true},
    content: { type: String, required: true },
    tags: {type: Array}
}, {collection: "post"});

postSchema.index({title: 'text', subtitle: 'text', content: 'text'});

export default mongoose.model('Post', postSchema);
