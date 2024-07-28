import { Book } from "../models/Book.js";
import { User } from "../models/User.js";
import { fetchBooksBySearch } from "../services/bookService.js";

export const createBook = async (req, res) => {
    console.log('req.body',req.body)
    const { book } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isInDB = user.collections.some(col => col.title === book.title);
        if (!isInDB) {
            user.collections.push(book);
        }

        await user.save();
        res.status(200).json(user.collections);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getBooks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const books =  user.collections;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book data' });
    }
};

export const deleteBook = async (req, res) => {
    const { book } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const index = user.collections.findIndex(col => col.title === book.title);
        if (index !== -1) {
            user.collections.splice(index, 1);
        }
        console.log(index)
        await user.save();
        res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    console.log('req.body', req.body);
    console.log('req.user', req.user);
    const {book}  = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isFavorite = user.favorites.some(favorite => favorite.title === book.title);
        if (!isFavorite) {
            user.favorites.push(book);
        }

        await user.save();
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    console.log('req.body', req.body);
    const { book } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const index = user.favorites.findIndex(favorite => favorite.title === book.title);
        if (index !== -1) {
            user.favorites.splice(index, 1);
        }
        await user.save();
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const purchaseBook = async (req, res) => {
    const { book } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPurchased = user.purchasedBooks.some(purchased => purchased.title === book.title);
        if (!isPurchased) {
            user.purchasedBooks.push(book);
        }

        await user.save();
        res.status(200).json(user.purchasedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPurchasedBooks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.purchasedBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const searchBooks = async (req, res) => {
    console.log('req.query', req.query);
    const query  = req.query.searchQuery;
    console.log('query', query);
    try {
        const books = await fetchBooksBySearch(query);
        res.status(200).json(books);
    } catch (error) {
        console.log('error', error);
        console.error('Error searching da:', error);
        res.status(500).json({ message: 'Error searching books' });
    }
};

