class RemoveStatusAndGuestCountFromGuests < ActiveRecord::Migration
  def change
    remove_column :guests, :status, :string
    remove_column :guests, :guest_count, :string
  end
end
