import mongoose from "mongoose";
import userModel from "./User"

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true,
    },
    isInProgress: {
        type: Boolean,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    }
)

const model = mongoose.models.Todo || mongoose.model("Todo", schema)

export default model