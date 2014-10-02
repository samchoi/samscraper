class AddActiveColumnsToSong < ActiveRecord::Migration
  def change
    add_column :songs, :active, :boolean
  end
end
