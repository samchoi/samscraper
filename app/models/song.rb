class Song < ActiveRecord::Base
  has_many :plays
  has_and_belongs_to_many :playlists

  def desc
    "#{self.artist} - #{self.title}"
  end

  def download_name
    desc + ".mp3"
  end

end
