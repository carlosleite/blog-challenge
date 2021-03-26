import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { fetchPost, selectPostById, deletePost } from './postsSlice'
import { useHistory } from "react-router-dom";

const Post = ({ match }) => {
  const { postId } = match.params

  const dispatch = useDispatch()
  const history = useHistory()

  const [loadingPost, setLoadingPost] = useState(true)
  const post = useSelector((state) => selectPostById(state, postId))

  useEffect(() => {
    dispatch(fetchPost(postId))
      .finally(() => {
        setLoadingPost(false)
      })
  }, [dispatch])

  const editPost = () => {
    history.push(`/posts/${postId}/edit`)
  }

  const deleteHandler = () => {
    dispatch(deletePost(postId))
      .then(unwrapResult)
      .then(() => {
        history.push('/')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  if (loadingPost) {
    return (
      <div className="loading-indicator text-center">
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <div className="py-4">
      <div className="row">
        <div className="col-8 offset-2">
          <div className="text-right">
            <button className="btn btn-dark" onClick={editPost}>Edit Post</button>
            <button className="btn btn-danger ml-3" onClick={deleteHandler}>Delete Post</button>
          </div>
          <h3>{post.title}</h3>
          <p>
            {post.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Post
