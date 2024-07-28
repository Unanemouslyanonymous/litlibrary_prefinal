import mongoose from "mongoose";
import { bookSchema } from "./Book.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    securityQuestion: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    favorites: [
        {
            type: bookSchema,
            ref: 'Book'
        }
    ],
    purchasedBooks: [
        {
            type: bookSchema,
            ref: 'Book'
        }
    ],
    collections: [
        {
            type: bookSchema,
            ref: 'Book'
        }
    ]
});

export const User = mongoose.model("User", userSchema);
