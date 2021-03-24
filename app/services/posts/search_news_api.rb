# frozen_string_literal: true

module Posts
  class SearchNewsApi
    API_ENDPOINT = 'https://newsapi.org/v2/everything'
    SEARCH_TERM = 'watches'

    def results(page)
      page = 1 unless page.positive?

      params = { pageSize: 10, page: page }

      body = send_request(params)

      {
        posts: body['articles'],
        meta: { prev_page: (page - 1), next_page: (page + 1) }
      }
    end

    private

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
