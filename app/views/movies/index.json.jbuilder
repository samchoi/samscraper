json.array!(@movies) do |movie|
  json.extract! movie, :id, :name, :image, :file
  json.url movie_url(movie, format: :json)
end
