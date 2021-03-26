# frozen_string_literal: true

# blog post model
class Post < ApplicationRecord
  paginates_per 4

  validates :title, :content, presence: true

  default_scope -> { order(created_at: :desc) }

  def type
    'local'
  end

  def as_json(_options = {})
    super(methods: [:type])
  end
end
