$(document).ready(init);

function init() {
    $('.js-submit-button').on('click', addBook);
    getBook();
}


function addBook () {
    let book = {
        title: $('.js-book-title').val(),
        author: $('.js-book-author').val(),
        published: $('.js-book-published').val()
      };

    postNewBook(book);

    book.title = $('.js-book-title').val('');
    book.author = $('.js-book-author').val('');
    book.published= $('.js-book-published').val(''); 
}

function postNewBook (book) {
    $.ajax({
        type: 'POST',
        url: '/all-books',
        data: book
    }).then((response) => {
        getBook();
    })
}

function getBook () {
    $.ajax ({
        type:'GET',
        url: '/all-books',
    })
    .then(function(response) {
        console.log(response)
        console.table(response);
        render(response);
    });
}

function render(booksArray){
    if (booksArray.length === 0) {
        return false;
    }

    const bookList = $('.book-container');
    bookList.empty();

    for (let book of booksArray) {
        let formatTime = moment(book.published).format('MMMM Do YYYY');


        bookList.append(`
        <p>${book.title} 
        ${book.author}  
        ${formatTime}
        </p>` );
    }


}