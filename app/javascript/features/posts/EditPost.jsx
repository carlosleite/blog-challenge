import React, { useEffect, useState } from 'react'
import { capitalize, isEmpty, isNil } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { updatePost, fetchPost, selectPostById } from './postsSlice'
import { useHistory } from "react-router-dom";
import PostForm from "./PostForm";

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
      <h2>Post not found!</h2>
    )
  }

  const submitHandler = (postParams) => {
    if (!isEmpty(postParams.title) && !isEmpty(postParams.content)) {
      dispatch(updatePost({ ...postParams, id: postId }))
        .then(unwrapResult)
        .then(() => {
          history.push(`/posts/${postId}`)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  return (
    <div className="py-4">
      <div className="row">
        <div className="col-8 offset-2">
          <h3>Edit Post</h3>
          <PostForm
            post={post}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default Post
