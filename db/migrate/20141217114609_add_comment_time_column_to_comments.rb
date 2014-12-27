class AddCommentTimeColumnToComments < ActiveRecord::Migration
  def change
    add_column :comments, :comment_time, :integer
  end
end
