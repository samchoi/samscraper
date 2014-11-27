class AddImageSourceToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :image_source, :text
  end
end
