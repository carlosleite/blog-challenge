import React, { useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { updatePost, fetchPost, selectPostById } from './postsSlice'
import { useHistory } from 'react-router-dom'
import PostForm from './PostForm'
import Loading from '../../components/Loading'

const Post = ({ match }) => {
  const { postId } = match.params

  const dispatch = useDispatch()
  const history = useHistory()

  const [loadingPost, setLoadingPost] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  const post = useSelector((state) => selectPostById(state, postId))

  useEffect(() => {
    dispatch(fetchPost(postId))
      .finally(() => {
        setLoadingPost(false)
      })
  }, [dispatch])

  if (loadingPost) {
    return <Loading />
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
          setShowSuccess(true)
          setTimeout(() => {
            history.push(`/posts/${postId}`)
          }, 500)
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
          {showSuccess && (
            <div className="alert alert-success" role="alert">
              Post updated
            </div>
          )}
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
