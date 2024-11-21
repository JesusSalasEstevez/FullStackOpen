const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((acumulator, blog) => {
        return acumulator + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((likedblog, blog) => {
        return likedblog.likes < blog.likes ? blog : likedblog
    })
}

module.exports = {dummy, totalLikes, favoriteBlog}
