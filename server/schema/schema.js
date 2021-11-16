const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList
 } = graphql;


//dummy data
var books = [
    {name: 'Intersteller', genre: 'Sci-Fi', id:'1', authorid: '1'},
    {name: 'Hobbit', genre: 'Fantasy', id:'2', authorid: '2'},
    {name: 'Harry Potter', genre: 'Fantasy', id:'3', authorid: '3'},
    {name: 'The Silmarillion', genre: 'Fantasy', id:'4', authorid: '2'},
    {name: 'The Children of Húrin', genre: 'Fantasy', id:'5', authorid: '2'},
    {name: 'Fantastic Beasts and Where to Find Them', genre: 'Fantasy', id:'6', authorid: '3'},
];

var authors = [
    {name: 'Jonathan Nolan', age: 45, id:'1'},
    {name: 'J.R.R. Tolkien', age: 91, id:'2'},
    {name: 'J.K. Rowling', age: 56, id:'3'},
]


//GraphQL OBject Types:
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id:parent.authorid });
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorid: parent.id });
            }
        }
    })
})

//Root Query :
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){
                //Code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args){
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})