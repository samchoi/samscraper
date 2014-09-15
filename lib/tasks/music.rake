namespace :music do
  desc 'Adding files to database'
  task :index => :environment do
    puts "Indexing files"
    Dir.foreach(APP_CONFIG[:music_path]) do |item|
      next if (['.', '..', 'hm'].include?(item) || Song.exists?(:filename => item))
      song_params = { filename: item, name: item[0..-5], code: 'tmp' }
      song = Song.new(song_params).save!
      puts song.inspect
    end
  end

  task :load_hm_history => :environment do
    puts "Getting Hypemachine History"
    14.times do |i|
      begin
        source = "http://hypem.com/playlist/history/samchoi/json/#{i+1}/data.json"
        json = JSON.load(source)
        puts json

      end
    end
  end
end
