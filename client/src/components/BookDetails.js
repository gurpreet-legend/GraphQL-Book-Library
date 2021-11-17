import React from 'react'
import { getBookQuery } from '../queries/queries'
import { useQuery } from '@apollo/client'

const BookDetails = ({bookId}) => {

    //Query hooks :
    const bookDetails = useQuery(getBookQuery, {
        variables: {
            id: bookId
        }
    });

    // Display function:
    const displayBookDetails = () => {
        const {book} = bookDetails.data
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author : </p>
                    <ul className="other-books">
                        {book.author.books.map(book=> {
                            return(
                                <li key={book.id}>{book.name}</li>
                            )
                        })

                        }
                    </ul>
                    
                </div>
            )
        }else { return (
            <div>No book selected ... </div>
        )}
    }

    if(bookDetails.loading){
        return (
            <div>Loading...</div>
        )
    }

    if(bookDetails.error){
        return (
            <div>Book details cannot be rendered</div>
        )
    }

    return (
        <div id="book-details">
            {displayBookDetails()}
        </div>
    )
}

export default BookDetails
