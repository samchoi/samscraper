class AddFilenameToSong < ActiveRecord::Migration
  def change
    add_column :songs, :filename, :string
  end
end
