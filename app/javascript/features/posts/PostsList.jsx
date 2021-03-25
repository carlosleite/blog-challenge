import React, { useEffect, useState } from 'react'
import { capitalize, isEmpty, isNil } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

import { selectPostsByType, fetchPosts } from './postsSlice'

const PostsList = ({ postsType }) => {
  const listTitle = `${capitalize(postsType)} posts`
  const dispatch = useDispatch()
  const posts = useSelector((state) => selectPostsByType(state, postsType))
  const [currentPage, setCurrentPage] = useState(1)
  const uiMeta = useSelector((state) => state.posts.ui[postsType])

  useEffect(() => {
    dispatch(fetchPosts({ source: postsType, page: currentPage }))
  }, [dispatch, currentPage])

  const PostContent = ({ post }) => {
    let content = post.content

    if (isEmpty(content)) {
      content = isEmpty(post.description) ? 'No content available' : post.description
    }

    return content.substring(0, 100)
  }

  const PaginationButton = ({ page, text }) => {
    return (
      <li className={`page-item ${isNil(page) ? 'disabled' : ''}`}>
        <button className="page-link" onClick={() => goToPage(page)}>{text}</button>
      </li>
    )
  }

  const PostThumbnail = ({ post }) => {
    let imgUrl = post.urlToImage

    if (isEmpty(imgUrl)) {
      imgUrl = 'https://picsum.photos/300/300'
    }

    const bgStyle = {
      backgroundImage: `url(${imgUrl})`,
      width: '200px',
      height: '100%',
      backgroundSize: 'cover'
    }

    return (
      <div style={bgStyle}></div>
    )
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <h3 className="py-4 mb-4 border-bottom">
        {listTitle}
      </h3>

      <div className="row mb-2">
        {posts.map((post, idx) => (
          <div className="col-md-6" key={idx}>
            <div
              className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{post.title}</h3>
                <p className="card-text mb-auto">
                  <PostContent post={post}/>
                </p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <PostThumbnail post={post}/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {uiMeta.loading && (
        <div className="loading-indicator text-center">
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <PaginationButton page={uiMeta.prevPage} text="Previous" />
          <PaginationButton page={uiMeta.nextPage} text="Next" />
        </ul>
      </nav>
    </div>
  )
}

export default PostsList
