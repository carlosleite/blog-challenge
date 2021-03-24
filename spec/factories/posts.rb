# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { 'SpaceX launches 60 more Starlink satellites, making 240 launched this month alone' }
    content do
      'SpaceX has added yet more Starlink satellites to its existing constellation on orbit, with \n
       a successful delivery of 60 spacecraft this morning from Cape Canaveral in Florida. The mission \n
       used a Falco…'
    end
  end
end
