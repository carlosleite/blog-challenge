# frozen_string_literal: true

class Post < ApplicationRecord
  paginates_per 10

  validates :title, :content, presence: true

  def type
    'local'
  end

  def as_json(_options = {})
    super(methods: [:type])
  end
end
