import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from 'axios'
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
    }
  }
})

export default postsSlice.reducer

export const selectPostsByType = (state, type) => state.posts.posts.filter((p) => p.type === type)
