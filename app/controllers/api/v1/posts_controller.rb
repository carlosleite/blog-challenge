# frozen_string_literal: true

module Api
  module V1
    # Post resource api controller
    class PostsController < Api::BaseController
      def index
        render json: Posts::Search.new(index_params).call
      end

      private

      def index_params
        params.permit(:source, :page)
      end
    end
  end
end
