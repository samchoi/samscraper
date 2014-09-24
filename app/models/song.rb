class Song < ActiveRecord::Base

  def desc
    "#{self.artist} - #{self.title}"
  end

  def download_name
    desc + ".mp3"
  end

end
