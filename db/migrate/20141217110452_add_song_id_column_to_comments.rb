class AddSongIdColumnToComments < ActiveRecord::Migration
  def change
    add_column :comments, :song_id, :integer
  end
end
