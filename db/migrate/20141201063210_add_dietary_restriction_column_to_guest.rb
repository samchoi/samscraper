class AddDietaryRestrictionColumnToGuest < ActiveRecord::Migration
  def change
    add_column :guests, :dietary_restriction, :text
  end
end
