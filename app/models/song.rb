class Song < ActiveRecord::Base
  has_many :plays

  def desc
    "#{self.artist} - #{self.title}"
  end

  def download_name
    desc + ".mp3"
  end

end
