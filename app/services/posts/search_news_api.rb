# frozen_string_literal: true

module Posts
  # Fetch post from newsapi.org
  class SearchNewsApi
    API_ENDPOINT = 'https://newsapi.org/v2/everything'
    SEARCH_TERM = 'watches'

    def results(page)
      page = 1 unless page.positive?

      params = { pageSize: 10, page: page }

      body = send_request(params)

      {
        posts: body['articles'],
        meta: pagination_info(page, body['totalResults'])
      }
    end

    private

    def pagination_info(current_page, total)
      {
        prev_page: current_page > 1 ? current_page - 1 : nil,
        next_page: (10 * current_page) >= total ? nil : current_page + 1
      }
    end

    def send_request(extra_params)
      params = extra_params.merge({ q: SEARCH_TERM, apiKey: ENV['NEWS_API_KEY'] })

      response = Faraday.get(
        API_ENDPOINT,
        params,
        'Content-Type' => 'application/json'
      )

      parsed_response = JSON.parse(response.body)

      raise ArgumentError, "Error calling NewsApi: #{parsed_response['message']}" if parsed_response['status'] != 'ok'

      parsed_response
    end
  end
end
