const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: { type: String, required: true , unique: true},
    posts: { type: Array },
    backgroundImagePath: {type: String}
}, {collection: "tag"});

tagSchema.index({name: 'text'});

module.exports = mongoose.model('Tag', tagSchema);
