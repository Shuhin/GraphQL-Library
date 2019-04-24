const bookSchema = require ('./book.js')
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');



const books = [
    {title:'Hunger Games', author: 'Suzzane Collins', publisher:'Scholastic', phptp_path:'/home/shuhin/Desktop/Shuhin-s-Library-master/public/uploads/bookImage-1551434055117.jpg'},
    {title:'Catching Fire', author: 'Suzzane Collins', publisher:'Scholastic', phptp_path:'/home/shuhin/Desktop/Shuhin-s-Library-master/public/uploads/bookImage-1551434055117.jpg'} 
];

const bookType = new GraphQLObjectType({
    name: 'Books',
    fields:() => ({
        id:{ type:GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        publisher: { type: GraphQLString },
        photo_path: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type:bookType,
            args:{
                title:{type:GraphQLString}
            },
            resolve( parentValue, args){
             for(let i =0; i <books.length; i++){
                 if(books[i].title == args.title){
                     return books[i];
                 }   
             }
          }
       },
       books:{
           type: new GraphQLList(bookType),
           resolve( root,args, context, info){
               return  bookSchema.find({}).exec();
           }
       }
    }
});

module.exports = new GraphQLSchema({
 query: RootQuery
});