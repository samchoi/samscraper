class AddColumnsToSong < ActiveRecord::Migration
  def change
    add_column :songs, :mediaid, :string
    add_column :songs, :artist, :string
    add_column :songs, :title, :string
    add_column :songs, :sitename, :string
    add_column :songs, :posturl, :string
    add_column :songs, :thumb_url_artist, :string
    add_column :songs, :description, :string
    add_column :songs, :itunes_link, :string
  end
end
