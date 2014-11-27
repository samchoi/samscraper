class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :name
      t.string :image
      t.string :file

      t.timestamps
    end
  end
end
