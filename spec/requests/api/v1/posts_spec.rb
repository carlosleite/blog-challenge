# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET /index' do
    let(:parsed_response) { JSON.parse(response.body) }

    it 'returns http success' do
      get api_v1_posts_path
      expect(response).to have_http_status(:success)
    end

    it 'returns 10 remote posts' do
      get api_v1_posts_path, params: { source: 'remote' }
      expect(response).to have_http_status(:success)

      expect(parsed_response['posts'].size).to eq(10)
      expect(parsed_response['meta']).to eq({ 'prev_page' => 0, 'next_page' => 2 })
    end

    it 'returns error on invalid source param' do
      get api_v1_posts_path, params: { source: 'invalid' }
      expect(response).to have_http_status(:bad_request)
      expect(parsed_response['message']).to eq('Invalid source param')
    end
  end

end
