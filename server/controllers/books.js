//  Student # : 301230830 - COMP229 - 28 Oct 2022 - Book.js(controller)
// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    /*****************
    * ADD CODE HERE *
    *****************/
    res.render('index', { title: 'Add a New Book', page: 'books/add', books: {} });

}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = booksModel({
        //variable name in edit.ejs
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });
    //save:create the module
    booksModel.create(newBook, (err, Book) => {
        //if error,then log and respond with error
        if (err) {
            console.error(err);
            res.end(err);
        };
        //redirect after success
        res.redirect('/books/list')
    })
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
    //fetching id 
    let id = req.params.id;
    //find id(callback)
    booksModel.findById(id, (err, books) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Edit Book', page: 'books/edit', books: books });
    });
}



// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/
    //fetching id
    let id = req.params.id;

    let newBook = booksModel({
        //variable name in edit.ejs
        _id: req.body.id,
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.updateOne({ _id: id }, newBook, (err, Book) => {
        if (err) {
            console.error(err);
            res.end(err);
        };

        res.redirect('/books/list')
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*****************
  * ADD CODE HERE *
  *****************/
    //fetching /retreive id
    let id = req.params.id;

    booksModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/books/list');
    })

}