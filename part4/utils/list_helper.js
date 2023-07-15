const dummy = (blogs) => {
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}