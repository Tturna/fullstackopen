const lodash = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const copy = Array.from(blogs)
    const sorted = copy.sort((a, b) => b.likes - a.likes)
    return sorted[0]
}

const mostBlogs = (blogs) => {
    const mostBlogs = lodash.countBy(blogs, b => b.author)
    const pairs = lodash.toPairs(mostBlogs)
    const sorted = pairs.sort((a,b) => b[1] - a[1])
    console.log(sorted)
    
    return {
        "author": sorted[0][0],
        "blogs": sorted[0][1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}