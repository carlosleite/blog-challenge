# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET /index' do
    let(:parsed_response) { JSON.parse(response.body) }

    it 'returns 10 remote posts' do
      get api_v1_posts_path, params: { source: 'remote' }
      expect(response).to have_http_status(:success)

      expect(parsed_response['posts'].size).to eq(10)
      expect(parsed_response['meta']).to eq({ 'prev_page' => nil, 'next_page' => 2 })
    end

    context 'local posts' do
      let!(:posts) { FactoryBot.create_list(:post, 12) }

      it 'returns first 10 local posts' do
        get api_v1_posts_path, params: { source: 'local' }
        expect(response).to have_http_status(:success)

        expect(parsed_response['posts'].size).to eq(10)
        expect(parsed_response['meta']).to eq({ 'prev_page' => nil, 'next_page' => 2 })
      end

      it 'returns last 2 local posts' do
        get api_v1_posts_path, params: { source: 'local', page: 2 }
        expect(response).to have_http_status(:success)

        expect(parsed_response['posts'].size).to eq(2)
        expect(parsed_response['meta']).to eq({ 'prev_page' => 1, 'next_page' => nil })
      end
    end

    it 'returns error on invalid source param' do
      get api_v1_posts_path, params: { source: 'invalid' }
      expect(response).to have_http_status(:bad_request)
      expect(parsed_response['message']).to eq('Invalid source param')
    end
  end
end
