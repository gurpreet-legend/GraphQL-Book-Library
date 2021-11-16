import React from 'react'
import { gql, useQuery } from '@apollo/client'

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

const BookList = () => {

    const {loading, error, data} = useQuery(getBooksQuery);
    console.log(loading, error, data);

    
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
                        <li key={index}>{book.name}</li>
                    )     
                })}
            </ul>
        </div>
    )
}

export default BookList
