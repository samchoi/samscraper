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
        path = '/playlist/loved/samchoi/json/#{i+1}/data.json'
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
              thumb_url: song["thumb_url"],
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
    Song.update_all({active: false})
    3.times do |i|
      begin
        domain = "hypem.com"
        path = "/playlist/popular/3day/json/#{i+1}/data.json"
        response = Net::HTTP.get_response(domain, path)
        history = JSON.parse(response.body)
        history.each do |key, song|
          next if key == 'version'
          counter += 1
          puts counter.to_s
          existing_song = Song.where({ code: song["mediaid"] }).first
          if existing_song
            existing_song.rank = counter
            existing_song.active = true
            existing_song.save
          else
            song_params = {
              filename: nil,
              name: "#{song["artist"]} - #{song["title"]}",
              code: song["mediaid"],
              mediaid: song["mediaid"],
              artist: song["artist"],
              title: song["title"],
              sitename: song["mediaid"],
              posturl: song["posturl"],
              thumb_url: song["thumb_url"],
              thumb_url_artist: song["thumb_url_artist"],
              description: song["description"],
              itunes_link: song["itunes_link"],
              rank: counter,
              active: true
            }
            status = Song.new(song_params).save!
          end
        end
      end
    end
  end

  task :load_folder => :environment do
    require "id3tag"
    
    ARGV.each { |a| task a.to_sym do ; end }

    path = ARGV[1]
    code = ARGV[2]
    mp3s = Dir.entries(path).select { |filename| filename =~ /\.mp3/i }

    mp3s.each do |file|     
      ID3Tag.read(File.open(path + "/"  + file, "rb")) do |tag|
        song_params = {
          filename: file,
          name: nil,
          code: code + tag.track_nr,
          mediaid: code,
          artist: tag.artist,
          title: tag.title,
          rank: tag.track_nr,
          active: true
        }
        Song.new(song_params).save!
      end
    end  
  end

  task :clean_db => :environment do
    songs = Song.all
    music_path = Rails.configuration.settings['music_path'] + '/'

    songs.each do |song|
      next if song.filename.nil?
      file = music_path + song.filename
      if File.zero?(file)
        song.active = false
        song.save
      end
    end 
  end

  task :zip => :environment do
    require 'rubygems'
    require 'zip'

    folder = Rails.configuration.settings['music_path']
    zipfile_name = Rails.configuration.settings['zip_path'] + 'test3.zip'

    songs = Song.where({active: true})
    puts zipfile_name
    Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
      songs.each do |song|
        filename = "#{song.artist} - #{song.title}.mp3"
        puts filename
        #id3 tag coming soon...
        # Two arguments:
        # - The name of the file as it will appear in the archive
        # - The original file, including the path to find it
        zipfile.add(filename, folder + '/' + song.filename) rescue nil
      end
      zipfile.get_output_stream("tracks.txt") do |os|
        os.write songs.map{ |song| "#{song.artist} - #{song.title}"}.join('\n')
      end
    end
  end

  task :tag_file => :environment do
    require 'rubygems'
    require 'id3lib'
    require 'zip'
    
    tag = ID3Lib::Tag.new('~/test3/sylas - Hollow.mp3')

    # Get and set text frames with convenience methods
    tag.title  = 'Hollow'
    tag.artist = 'sylas'
    tag.update!
  end
end
