class CreatePlays < ActiveRecord::Migration
  def change
    create_table :plays do |t|
      t.integer :song_id
      t.integer :user_id
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
