const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

router.route('/').get(booksController.getAll_books);
router.route('/:id').get(booksController.get_books_by_seller);
router.route('/getbook/:id').get(booksController.get_particular_book);
router.route('/add').post(booksController.add_book);
router.route('/edit/:id').patch(booksController.edit_book);
router.route('/delete/:id').delete(booksController.delete_book);

module.exports = router;
