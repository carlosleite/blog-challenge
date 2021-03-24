# frozen_string_literal: true

module Api
  module V1
    # Post resource api controller
    class PostsController < Api::BaseController
      def index
        render json: Posts::Search.new(index_params).call
      end

      def create
        post = Post.create!(post_params)

        render json: post
      end

      def show
        render json: post
      end

      def update
        post.update!(post_params)

        render json: post
      end

      def destroy
        post.destroy!

        render json: post
      end

      private

      def index_params
        params.permit(:source, :page)
      end

      def post_params
        params.require(:post).permit(:title, :content)
      end

      def post
        @post ||= Post.find(params[:id])
      end
    end
  end
end
