import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getAuthorsQuery } from '../queries/queries';

const AddBook = () => {

    const {loading, error, data} = useQuery(getAuthorsQuery);
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [authorid, setAuthorid] = useState('')

    const submitForm = (e) => {
        e.preventDefault();
        console.log(name, genre, authorid)
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
                    { (loading || error) ? <option disabled>Loading...</option> :
                        data.authors.map(author=> {
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
