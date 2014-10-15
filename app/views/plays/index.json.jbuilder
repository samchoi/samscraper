json.array!(@plays) do |play|
  json.extract! play, :id, :song_id, :user_id, :lat, :long
  json.url play_url(play, format: :json)
end
