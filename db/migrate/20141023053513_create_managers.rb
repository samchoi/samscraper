class CreateManagers < ActiveRecord::Migration
  def change
    create_table :managers do |t|
      t.string :paypal_id
      t.string :venmo_id
      t.string :square_id
      t.string :name

      t.timestamps
    end
  end
end
