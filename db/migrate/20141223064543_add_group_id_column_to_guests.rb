class AddGroupIdColumnToGuests < ActiveRecord::Migration
  def change
    add_column :guests, :group_id, :integer
  end
end
