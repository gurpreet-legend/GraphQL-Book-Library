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
    // console.log(this.props);
    const {loading, error, data} = useQuery(getBooksQuery);
    console.log(loading, error, data);
    return (
        <div>
            <ul id="book-list">
                <li>Book name</li>
            </ul>
        </div>
    )
}

export default BookList
