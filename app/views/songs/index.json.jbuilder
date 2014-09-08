json.array!(@songs) do |song|
  json.extract! song, :id, :song_id, :name, :code
  json.url song_url(song, format: :json)
end
