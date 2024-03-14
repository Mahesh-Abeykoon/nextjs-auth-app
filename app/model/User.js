import mongoose , {Schema, trusted} from "mongoose"

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise; 

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    }, {
    timestamps: trusted

    });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;