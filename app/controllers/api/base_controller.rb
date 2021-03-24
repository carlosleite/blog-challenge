# frozen_string_literal: true

module Api
  # base api controller
  class BaseController < ActionController::API
    rescue_from StandardError do |e|
      render json: { message: e.message }, status: :internal_server_error
    end

    rescue_from ActiveRecord::RecordInvalid do |e|
      render json: { message: e.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { message: e.message }, status: :not_found
    end

    rescue_from ArgumentError do |e|
      render json: { message: e.message }, status: :bad_request
    end
  end
end
