import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    schoolemail: { type: String, unique: true, required: true },
    type: { type: String, default: 'student' },
    time: { type: Date, default: Date.now },
    password1: { type: String, default: '' },
    activeTeamCode: { type: String, default: '' }
});

UserSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["schoolemail"] });

export default mongoose.model('User', UserSchema);