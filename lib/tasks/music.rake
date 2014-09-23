namespace :music do
  desc 'Adding files to database'
  task :index => :environment do
    puts "Indexing files"
    Dir.foreach(Rails.configuration.settings['music_path']) do |item|
      next if ['.', '..'].include?(item)
      code = item[0..-5]
      song = Song.find_by_code(code)
      next if song.nil?
      song.filename = item
      song.save
      puts song.inspect
    end
  end

  task :load_hm_history => :environment do
    require 'net/http'
    puts "Getting Hypemachine History"
    15.times do |i|
      begin
        source = "hypem.com"
        path = '/playlist/history/samchoi/json/#{i+1}/data.json'
        response = Net::HTTP.get_response(source, path)
        history = JSON.parse(response.body)
        history.each do |key, song|
          next if key == 'version'
          song_params = { filename: nil, name: "#{song["artist"]} - #{song["title"]}", code: song["mediaid"] }
          puts Song.new(song_params).save!
        end

      end
    end
  end
end