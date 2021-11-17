import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = () => {

    //States :
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [authorid, setAuthorid] = useState('')

    //Query/Mutation hooks :
    const authors = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    //Event listerners :
    const submitForm = (e) => {
        e.preventDefault();
        console.log(name, genre, authorid);
        addBook({
            variables: {
                name: name,
                genre: genre,
                authorid: authorid
            },
            refetchQueries: [
                { query: getBooksQuery }
            ]
        });
    }

    return (
        <form id="add-book" onSubmit={submitForm}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={ (e) => setName(e.target.value)}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={ (e) => setGenre(e.target.value)} />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={ (e) => setAuthorid(e.target.value)}>
                    <option>Select authors</option>
                    { (authors.loading || authors.error) ? <option disabled>Loading...</option> :
                        authors.data.authors.map(author=> {
                            return (
                                <option value={author.id} key={author.id}>{author.name}</option> 
                            )
                        })
                    }  
                </select>
            </div>

            <button>+</button>

        </form>
    )
}

export default AddBook
