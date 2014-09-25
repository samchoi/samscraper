class AddColumnToSong < ActiveRecord::Migration
  def change
    add_column :songs, :thumb_url, :string
  end
end
