import mongoose , {Schema} from "mongose"

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
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;