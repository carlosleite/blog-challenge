import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, put, delete as deleteRequest} from 'axios'
import { camelizeKeys } from 'humps'

const API_URL = '/api/v1/posts'

const initialState = {
  posts: [],
  ui: { // to handle pagination for each post type
    remote: {
      prevPage: null,
      nextPage: null,
      loading: false
    },
    local: {
      prevPage: null,
      nextPage: null,
      loading: false
    }
  },
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params) => {
  const response = await get(API_URL, { params })
  return response.data
})

export const fetchPost = createAsyncThunk('posts/fetchPost', async (postId) => {
  const response = await get(`${API_URL}/${postId}`)
  return response.data
})

export const createPost = createAsyncThunk('posts/create', async (params) => {
  const response = await post(API_URL, { post: params })
  return response.data
})

export const updatePost = createAsyncThunk('posts/update', async (params) => {
  const response = await put(`${API_URL}/${params.id}`, { post: params })
  return response.data
})

export const deletePost = createAsyncThunk('posts/delete', async (postId) => {
  const response = await deleteRequest(`${API_URL}/${postId}`)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      const postsType = action.meta.arg.source
      state.ui[postsType].loading = true
    },
    [fetchPosts.fulfilled]: (state, action) => {
      const postsType = action.meta.arg.source
      const payloadMeta = camelizeKeys(action.payload.meta)
      const otherTypePosts = state.posts.filter((p) => p.type !== postsType) // post that are not from the current type(should not be removed)

      state.ui[postsType] = { ...payloadMeta, loading: false }
      state.posts = otherTypePosts.concat(action.payload.posts)
    },
    [fetchPosts.rejected]: (state, action) => {
      const postsType = action.meta.arg.source
      state.ui[postsType].loading = false
      state.error = action.payload
    },
    [fetchPost.pending]: (state) => {
      state.ui.local.loading = true
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.ui.local.loading = false
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPost.rejected]: (state, action) => {
      state.ui.local.loading = false
      state.error = action.payload
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.payload
    },
    [updatePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload.id).concat(action.payload)
    },
    [updatePost.rejected]: (state, action) => {
      state.error = action.payload
    }
  }
})

export default postsSlice.reducer

export const selectPostsByType = (state, type) => state.posts.posts.filter((p) => p.type === type)
export const selectPostById = (state, postId) => state.posts.posts.find((p) => p.id === parseInt(postId))
