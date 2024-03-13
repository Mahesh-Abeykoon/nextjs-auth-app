import mongoose , {Schema} from "mongoose"

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise; 

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        trype: String
    },
    password: {
        String
    },
    timestamps: {
        required: true,
    },
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;