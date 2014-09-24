namespace :music do
  desc 'Adding filenames to database'
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
          song_params = {
              filename: nil,
              name: "#{song["artist"]} - #{song["title"]}",
              code: song["mediaid"],
              mediaid: song["mediaid"],
              artist: song["artist"],
              title: song["title"],
              sitename: song["mediaid"],
              posturl: song["posturl"],
              thumb_url_artist: song["thumb_url_artist"],
              description: song["description"],
              itunes_link: song["itunes_link"]
          }
          puts Song.new(song_params).save!
        end

      end
    end
  end

  task :load_hm => :environment do
    require 'net/http'
    puts "Getting Hypemachine Top 50"
    counter = 0
    3.times do |i|
      begin
        domain = "hypem.com"
        path = "/playlist/popular/3day/json/#{i+1}/data.json"
        response = Net::HTTP.get_response(domain, path)
        history = JSON.parse(response.body)
        history.each do |key, song|
          next if key == 'version'
          song_params = {
              filename: nil,
              name: "#{song["artist"]} - #{song["title"]}",
              code: song["mediaid"],
              mediaid: song["mediaid"],
              artist: song["artist"],
              title: song["title"],
              sitename: song["mediaid"],
              posturl: song["posturl"],
              thumb_url_artist: song["thumb_url_artist"],
              description: song["description"],
              itunes_link: song["itunes_link"]
          }
          counter += 1
          status = Song.new(song_params).save! unless Song.exists?({ code: song["mediaid"] })
          puts counter.to_s
        end
      end
    end
  end

  task :zip => :environment do
    require 'rubygems'
    require 'zip'

    folder = Rails.configuration.settings['music_path']
    zipfile_name = Rails.configuration.settings['zip_path'] + 'test3.zip'

    songs = [Song.first, Song.last]
    puts zipfile_name
    Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
      songs.each do |song|
        filename = song.filename
        puts song.filename
        # Two arguments:
        # - The name of the file as it will appear in the archive
        # - The original file, including the path to find it
        zipfile.add(filename, folder + '/' + filename)
      end
      zipfile.get_output_stream("tracks.txt") do |os|
        os.write songs.map{ |song| "#{song.artist} - #{song.title}"}.join('\n')
      end
    end
  end
end