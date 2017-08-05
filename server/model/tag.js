import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: { type: String, required: true , unique: true},
    posts: { type: Array },
    backgroundImagePath: {type: String}
}, {collection: "tag"});

tagSchema.index({name: 'text'});

export default mongoose.model('Tag', tagSchema);
