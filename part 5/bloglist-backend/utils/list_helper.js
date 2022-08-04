// var _ = require('lodash');


// const dummy = (blogs) => {
//     return 1
// }

// const totalLikes = (blogs) => {
//     return blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)
// }

// const favouriteBlog = (blogs) => {

//     const getBlog = (blogs) => {
//         const val = Math.max.apply(Math, blogs.map(b => b.likes))
//         return blogs.find(b => b.likes === val)
//     }

//     return blogs.length === 0 ? 0 : getBlog(blogs)
// }

// const mostBlogs = (blogs) => {

//     const authorList = _.countBy(blogs, 'author')
//     const tuples = Object.entries(authorList)
//     const author = _.maxBy(tuples, tuples.last)

//     // console.log("MOST BLOGS: ", a, author)
//     return author
// }

// const mostLikes = (blogs) => {

//     const result = []
//     blogs.reduce(function(res, blog) {
//         if (!res[blog.author]) {
//           res[blog.author] = { author: blog.author, likes: 0 };
//           result.push(res[blog.author])
//         }
//         res[blog.author].likes += blog.likes
//         return res
//       }, {})
    
//     const author = _.maxBy(result, e => e.likes)
//     console.log("MOST LIKES: ", author)
//     return author
// }

// module.exports = {
//     dummy,
//     totalLikes,
//     favouriteBlog,
//     mostBlogs,
//     mostLikes
// }


