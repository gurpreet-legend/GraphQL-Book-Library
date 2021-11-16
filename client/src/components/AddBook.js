import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { getAuthorsQuery } from '../queries/queries';

const AddBook = () => {

    const {loading, error, data} = useQuery(getAuthorsQuery);
    console.log(loading, error, data);

    return (
        <form id="add-book">

            <div className="field">
                <label>Book name:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" />
            </div>

            <div className="field">
                <label>Author:</label>
                <select>
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
