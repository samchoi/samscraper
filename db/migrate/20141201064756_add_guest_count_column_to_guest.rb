class AddGuestCountColumnToGuest < ActiveRecord::Migration
  def change
    add_column :guests, :guest_count, :integer
  end
end
