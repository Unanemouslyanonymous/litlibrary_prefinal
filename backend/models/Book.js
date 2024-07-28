import mongoose from "mongoose";
// const review = new mongoose.Schema({

// },{timestamps: true;})
export const bookSchema = new mongoose.Schema({
    id: String,
    title: String,
    authors: [String],
    publish_date: String,
    cover: {
      thumbnail: String,
    },
    description: String,
    genre: [String],
    page: Number,
  });

export const Book = mongoose.model("Book", bookSchema);
