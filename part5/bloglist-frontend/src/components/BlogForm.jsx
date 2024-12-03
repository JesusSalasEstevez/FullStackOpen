const BlogForm = ({createBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <div>
        <h2>Create New</h2>
        <form onSubmit={createBlog}>
            <div>
                title:
                <input
                    type="text"
                    valute={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    valute={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    valute={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
        </div>
    )
}

export default BlogForm