import React from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries';

const BookList = () => {

    const {loading, error, data} = useQuery(getBooksQuery);

    
    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    if(error){
        return (
            <div>Book list cannot be rendered</div>
        )
    }
    

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book, index) => {
                    return (
                        <li key={index}>{book.name}</li>
                    )     
                })}
            </ul>
        </div>
    )
}

export default BookList
