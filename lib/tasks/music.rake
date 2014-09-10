namespace :music do
  desc 'Adding files to database'
  task :index => :environment do
    puts "Indexing files"
    Dir.foreach('/path/to/dir') do |item|
      next if item == '.' or item == '..'
    end
  end
end