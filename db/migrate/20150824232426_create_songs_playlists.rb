class CreateSongsPlaylists < ActiveRecord::Migration
  def self.up
    create_table :songs_playlists do |t|
      t.integer :song_id
      t.integer :playlist_id
      t.integer :user_id
    end
  end

  def self.down
    drop_table :songs_playlists
  end
end
