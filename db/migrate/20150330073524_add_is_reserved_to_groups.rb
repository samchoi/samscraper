class AddIsReservedToGroups < ActiveRecord::Migration
  def change
    add_column :groups, :reserved, :boolean
  end
end
