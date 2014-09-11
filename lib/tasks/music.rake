namespace :music do
  desc 'Adding files to database'
  task :index => :environment do
    Dir.foreach('/home/deploy/www/samscraper/public/music') do |item|
      next if (['.', '..', 'hm'].include?(item) || Song.exists?(:filename => item))
      song_params = { filename: item, name: item[0..-5], code: 'tmp' }
      song = Song.new(song_params).save!
      puts song.inspect
    end
  end
end
