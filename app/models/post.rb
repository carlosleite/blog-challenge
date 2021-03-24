# frozen_string_literal: true

class Post < ApplicationRecord
  paginates_per 10

  validates :title, :content, presence: true
end
