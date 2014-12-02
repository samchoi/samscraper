class AddMessageColumnToGuest < ActiveRecord::Migration
  def change
    add_column :guests, :message, :text
  end
end
