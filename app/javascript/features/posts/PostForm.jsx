import React, { useState } from 'react'

const PostForm = ({ post, submitHandler }) => {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={title}
          onChange={onTitleChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="postContent">Content:</label>
        <textarea
          className="form-control"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </div>
      <div className="text-right">
        <button className="btn btn-dark" type="button" onClick={() => submitHandler({ title, content })}>
          Save Post
        </button>
      </div>
    </form>
  )
}

export default PostForm
