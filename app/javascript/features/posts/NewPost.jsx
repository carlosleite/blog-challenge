import React from 'react'
import { isEmpty } from 'lodash'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { createPost } from './postsSlice'
import { useHistory } from "react-router-dom";
import PostForm from "./PostForm";

const NewPost = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const initialPost = { title: '', content: '' }

  const submitHandler = (postParams) => {
    if (!isEmpty(postParams.title) && !isEmpty(postParams.content)) {
      dispatch(createPost(postParams))
        .then(unwrapResult)
        .then(() => {
          history.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className="py-4">
      <div className="row">
        <div className="col-8 offset-2">
          <h3>New Post</h3>
          <PostForm
            post={initialPost}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default NewPost
