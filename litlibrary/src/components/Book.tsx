"use client";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import BookModel from "@/app/models/bookModel";
import dotenv from "dotenv";
import { Eye, Heart, HeartCrack } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
// import Book from "@/app/models/bookModel";
dotenv.config();
interface BookProps {
  book: {
    id: string;
    title: string;
    authors: string[];
    publish_date: string;
    cover: { thumbnail: string };
    description: string;
    genre: string[];
    page: number;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  // const [book, setBook] = useState<BookModel | null>(null);
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { token, user } = authContext;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInDb, setIsInDb] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const createBook = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/books",
        { book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book created:", response.data);
      setIsInDb(true);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };
  const deleteBook = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/books/delete",
        { book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book deleted:", response.data);
      setIsInDb(false);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }
  const addFavorite = async () => {
    try {
      console.log("book", book);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/books/favorite",
        { book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book added to favorites:", response.data);
      setIsFavorite(true);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/books/remove-favorite",
        { book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book removed from favorites:", response.data);
      setIsFavorite(false);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const purchaseBook = async () => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/books/purchase",
        { book },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book purchased:", response.data);
    } catch (error) {
      console.error("Error purchasing book:", error);
    }
  };
  if (!book) return null;
  if (user) {
    console.log(user.collections.some((b:BookModel) => b.title === book.title));
  }

  return (
    <div className="bg-white p-4 rounded">
      {/* <h2 className="text-xl font-semibold">{book.title}</h2> */}
      <Card className="w-64 h-[360px] p-3 flex flex-col flex-wrap justify-between items-center shadow-xl">
        <div className="flex flex-col items-center justify-center hover:cursor-pointer">
          <CardHeader className="text-xl font-semibold">
            {book.title}
          </CardHeader>
          <img
            src={book.cover?.thumbnail}
            alt={book.title}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-row justify-between w-full items-center z-5">
          {isFavorite ? (
            <button onClick={() => removeFavorite()}>
              <HeartCrack className="text-red-500" />
            </button>
          ) : (
            <button onClick={() => addFavorite()}>
              <Heart className="text-red-500" />
            </button>
          )}
          <Button
            onClick={() => {
              setIsPopupOpen(true);
            }}
          >
            {" "}
            <Eye className="mr-2" />
            View
          </Button>
        </div>
      </Card>
      {isPopupOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded w-[60vw]">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold">
                {" "}
                <b>{book.title}</b>
              </h2>
              <div className="flex flex-row justify-center items-center mt-3">
                <img
                  src={book.cover?.thumbnail}
                  alt={book.title}
                  width={200}
                  height={200}
                />
                <div className="flex flex-col ">
                  <p>
                    <b>Authors</b>: {book.authors.join(", ")}
                  </p>
                  <p>
                    <b>Publish Date</b>: {book.publish_date}
                  </p>
                  <p>
                    <b>Genre</b>: {book.genre}
                  </p>
                  <p className="mt-4">
                    <b>Description</b>: {book.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-3">
              <div className="flex flex-row justify-center items-center mt-3 space-x-3">
                {isFavorite ? (
                  <Button onClick={() => removeFavorite()}>
                    Remove from Favorites
                  </Button>
                ) : (
                  <Button onClick={() => addFavorite()}>
                    Add to Favorites
                  </Button>
                )}
                <Button onClick={purchaseBook}>
                  Buy for $
                  {book.page === 0 || book.page == null  ? 150 : book.page}
                </Button>
                { isInDb ? (
                  <Button onClick={deleteBook}>
                    Remove from Collection
                  </Button>
                ):
                <Button onClick={createBook}>
                Add to Collection
              </Button>
                }
                
              </div>

              <Button onClick={() => setIsPopupOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
      {/* <p>{book.authors.join(', ')}</p>
      <p>{book.publish_date}</p>
       
      <p>{book.description}</p>
      <p>{book.genre}</p> */}
    </div>
  );
};

export default Book;
