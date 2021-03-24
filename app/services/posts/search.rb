# frozen_string_literal: true

module Posts
  # main post search class
  class Search
    SEARCH_REMOTE = 'remote'
    SEARCH_LOCAL  = 'local'

    attr_accessor :params

    def initialize(params)
      @params = params
    end

    def call
      case params[:source]
      when SEARCH_REMOTE
        Posts::SearchNewsApi.new.results(params[:page].to_i)
      when SEARCH_LOCAL
        Posts::SearchLocal.new.results(params[:page].to_i)
      else
        raise ArgumentError, 'Invalid source param'
      end
    end
  end
end
