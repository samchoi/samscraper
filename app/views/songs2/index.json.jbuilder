json.array!(@audios) do |audio|
  json.extract! audio, :id, :code, :title, :artist
  json.url audio_url(audio, format: :json)
end
