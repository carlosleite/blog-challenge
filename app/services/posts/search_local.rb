# frozen_string_literal: true

module Posts
  # query local posts
  class SearchLocal
    def results(page)
      page = 1 unless page.positive?
      posts = Post.page(page)

      {
        posts: posts,
        meta: { prev_page: posts.prev_page, next_page: posts.next_page }
      }
    end
  end
end
