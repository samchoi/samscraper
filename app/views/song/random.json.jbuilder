json.(@songs) do |song|
  json.extract! song, :id, :song_id, :name, :code, :created_at, :updated_at, :filename, :mediaid, :artist, :title, :sitename, :posturl, :thumb_url_artist, :itunes_link, :thumb_url , :rank, :active
end