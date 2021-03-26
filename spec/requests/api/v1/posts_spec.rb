# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  let(:parsed_response) { JSON.parse(response.body) }

  describe '#index' do
    it 'returns 4 remote posts' do
      get api_v1_posts_path, params: { source: 'remote' }
      expect(response).to have_http_status(:success)

      expect(parsed_response['posts'].size).to eq(4)
      expect(parsed_response['meta']).to eq({ 'prev_page' => nil, 'next_page' => 2 })
    end

    context 'local posts' do
      let!(:posts) { FactoryBot.create_list(:post, 6) }

      it 'returns first 10 local posts' do
        get api_v1_posts_path, params: { source: 'local' }
        expect(response).to have_http_status(:success)

        expect(parsed_response['posts'].size).to eq(4)
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

  describe '#create' do
    let(:post_params) { FactoryBot.attributes_for(:post) }
    let(:request) do
      post api_v1_posts_path, params: { post: post_params }
    end

    it 'add the post to the DB' do
      expect { request }.to(change(Post, :count).by(1))
      expect(response).to have_http_status(:success)
      expect(parsed_response['id']).to be_present
    end

    context 'with invalid values' do
      let(:post_params) { FactoryBot.attributes_for(:post, title: nil) }

      it 'return 422 status' do
        expect { request }.to(change(Post, :count).by(0))
        expect(response).to have_http_status(:unprocessable_entity)
        expect(parsed_response['message']).to eq('Title can\'t be blank')
      end
    end
  end

  describe '#show' do
    let(:existing_post) { FactoryBot.create(:post, title: 'My post') }

    it 'returns the post info' do
      get api_v1_post_path(existing_post.id)

      expect(response).to have_http_status(:success)
      expect(parsed_response['id']).to eq(existing_post.id)
      expect(parsed_response['title']).to eq('My post')
    end

    context 'with invalid id' do
      it 'return 404 status' do
        get api_v1_post_path(9999)

        expect(response).to have_http_status(:not_found)
        expect(parsed_response['message']).to eq('Couldn\'t find Post with \'id\'=9999')
      end
    end
  end

  describe '#update' do
    let(:existing_post) { FactoryBot.create(:post) }

    it 'update post title' do
      put api_v1_post_path(existing_post.id), params: { post: { title: 'Title updated' } }

      expect(response).to have_http_status(:success)
      expect(existing_post.reload.title).to eq('Title updated')
    end

    context 'with invalid values' do
      let(:post_params) { FactoryBot.attributes_for(:post, title: '') }

      it 'return 422 status' do
        put api_v1_post_path(existing_post.id), params: { post: { title: '' } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(parsed_response['message']).to eq('Title can\'t be blank')
      end
    end
  end

  describe '#destroy' do
    let!(:existing_post) { FactoryBot.create(:post, title: 'My post to delete') }
    let(:request) { delete api_v1_post_path(existing_post.id) }

    it 'returns the post info' do
      expect { request }.to change(Post, :count).by(-1)
      expect(response).to have_http_status(:success)
    end

    context 'with invalid id' do
      it 'return 404 status' do
        delete api_v1_post_path(9999)

        expect(response).to have_http_status(:not_found)
        expect(parsed_response['message']).to eq('Couldn\'t find Post with \'id\'=9999')
      end
    end
  end
end
