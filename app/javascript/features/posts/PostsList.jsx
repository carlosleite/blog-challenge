import React, { useEffect, useState } from 'react'
import { capitalize, isEmpty, isNil } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { selectPostsByType, fetchPosts } from './postsSlice'
import Loading from '../../components/Loading'

const PostsList = ({ postsType }) => {
  const listTitle = `${capitalize(postsType)} posts`
  const dispatch = useDispatch()
  const history = useHistory()

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

  const PostThumbnail = ({ post, idx }) => {
    let imgUrl = post.urlToImage

    if (isEmpty(imgUrl)) {
      imgUrl = `https://picsum.photos/300/300?random=${idx}`
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

  const goToPost = (post) => {
    if (postsType === 'remote') {
      window.open(post.url, '_blank')
    } else {
      history.push(`/posts/${post.id}`)
    }
  }

  return (
    <div>
      <h3 className="py-4 mb-4 border-bottom">
        {listTitle}

        {postsType === 'local' &&
          <Link className="btn btn-dark float-right" to="/posts/new">Add Post</Link>
        }
      </h3>

      <div className="row mb-2">
        {posts.map((post, idx) => (
          <div className="col-md-6 blog-post-item" key={idx} onClick={() => goToPost(post)}>
            <div
              className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <h3 className="mb-0">{post.title}</h3>
                <p className="card-text mb-auto">
                  <PostContent post={post}/>
                </p>
              </div>
              <div className="col-auto d-none d-lg-block">
                <PostThumbnail
                  post={post}
                  idx={idx}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {uiMeta.loading && (
        <Loading />
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
