# frozen_string_literal: true

# base model class
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
