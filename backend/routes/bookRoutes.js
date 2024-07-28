import express from 'express';
import { createBook, getBooks, getBookById, deleteBook, addFavorite, purchaseBook , searchBooks, removeFavorite, getFavorites, getPurchasedBooks} from '../controllers/bookController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, createBook);
router.get('/',auth, getBooks);
router.post('/delete', auth, deleteBook);
router.post('/favorite',auth, addFavorite);
router.get('/get-favorites',auth, getFavorites);
router.post('/remove-favorite',auth, removeFavorite);
router.post('/purchase',auth, purchaseBook);
router.get('/get-purchases',auth, getPurchasedBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
export default router;
