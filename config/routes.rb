# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :posts, except: %i[new edit]
    end
  end

  root 'static#index'
  match "(*path)", to: "static#index",
        defaults: { format: :html },
        via: [:get],
        constraints: ->(req) { req.format == :html }
end
