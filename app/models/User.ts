import {Schema, model, models} from "mongoose";

// Creamos un modelo para los usuarios de la base de datos
const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    imgUrl: {
        type: String,
        required: false
    }
},
{timestamps: true}
)

const User = models.User || model('User', userSchema)
export default User