class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :song_id
      t.string :name
      t.string :code

      t.timestamps
    end
  end
end
