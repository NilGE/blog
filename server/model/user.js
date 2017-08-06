import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true , unique: true},
    blogTitle: { type: String },
    backgroundImagePath: {type: String}
}, {collection: "user"});

userSchema.index({userName: 'text'});

export default mongoose.model('User', userSchema);
