class CreateGuests < ActiveRecord::Migration
  def change
    create_table :guests do |t|
      t.string :name
      t.boolean :status
      t.string :address
      t.string :city
      t.string :state
      t.string :zipcode

      t.timestamps
    end
  end
end
