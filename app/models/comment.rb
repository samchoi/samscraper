class Comment < ActiveRecord::Base
  scope :song, ->(song_id) { where.not({comment_time: nil}).where({song_id: song_id}).group('comment_time').order('comment_time ASC') }
end
