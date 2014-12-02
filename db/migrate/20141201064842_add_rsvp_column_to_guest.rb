class AddRsvpColumnToGuest < ActiveRecord::Migration
  def change
    add_column :guests, :rsvp, :string
  end
end
