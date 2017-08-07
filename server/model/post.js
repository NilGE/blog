const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    datetime: { type: String, required: true },
    author: { type: String, required: true},
    content: { type: String, required: true },
    tags: {type: Array},
    backgroundImagePath: {type: String}
}, {collection: "post"});

postSchema.index({title: 'text', subtitle: 'text', content: 'text'});

module.exports = mongoose.model('Post', postSchema);
