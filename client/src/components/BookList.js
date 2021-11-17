import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
    //states :
    const [selected, setSelected] = useState(null)

    //Query hooks :
    const {loading, error, data} = useQuery(getBooksQuery);

    
    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <ul id="book-list">
                {data.books.map((book, index) => {
                    return (
                        <li key={index} onClick={ (e) => {setSelected(book.id)}}>{book.name}</li>
                    )     
                })}
            </ul>
            <BookDetails bookId = {selected}/>
        </div>
    )
}

export default BookList
