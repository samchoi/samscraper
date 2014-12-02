class AddCountryColumnToGuest < ActiveRecord::Migration
  def change
    add_column :guests, :country, :string
  end
end
