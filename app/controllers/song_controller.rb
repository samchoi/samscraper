class SongController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:add_to_session_playlist, :add_to_session_filter]

  before_filter :prepare_fixed_assets

  layout 'mobile', only: [:mobile]
  # GET /song
  # GET /song.json
  def index
    #redirect_to home_path and return unless browser.chrome?
    #@songs = Song.where.not(id: session[:song_filter], filename: nil)
    @songs = Song.where(active: true).order('rank ASC')
    @song = Song.where.not(filename: nil).order("RAND()").limit(1).first
    @playlist = session[:playlist].nil? ? [] : Song.where(id: session[:playlist])

    gon.music_host = Rails.configuration.settings['filehost']
    gon.songs = @songs;
    gon.song = @song;
    gon.comments = Comment.song(@song.id)
    gon.playlist = @playlist
  end

  def mobile
    @songs = Song.where(active: true).order('rank ASC')
    @song = @songs.sample
    gon.music_host = Rails.configuration.settings['filehost']
  end

  def home
    require 'rss'
    redirect_to mobile_path and return if browser.mobile?
    url = 'http://www.sfweekly.com/sanfrancisco/Rss.xml?section=2124628'
    @events = RSS::Parser.parse(open(url).read, false)
    binding
  end

  def clear
    session[:playlist] = nil
    redirect_to music_path and return
  end

  def add_to_session_playlist
    session[:playlist] = [] if session[:playlist].nil?
    session[:playlist] << params[:song_id]

    @songs = Song.where(id: session[:playlist]) rescue []

    respond_to do |format|
      format.all do
        render json: @songs
      end
    end
  end

  def send_zip
    #to optimize this we can create a rabbitmq and a running process that runs the following as a rake job
    require 'rubygems'
    require 'zip'

    music_path = Rails.configuration.settings['music_path']

    zip_file = params[:name] + '.zip'
    zip_file_path = Rails.configuration.settings['zip_path'] + zip_file

    songs = Song.where.not(filename: nil)
    
    Zip::File.open(zip_file_path, Zip::File::CREATE) do |zip|
      songs.each do |song|
        music_file_path = music_path + '/' + song.filename
        zip.add("#{song.download_name}", music_file_path)
      end
      zip.get_output_stream("tracks.txt") do |os|
        os.write songs.map{ |song| "#{song.desc}"}.join("\n")
      end
    end

    send_file zip_file_path, :type => 'application/zip', :filename => zip_file

  end

  def send_song
    music_path = Rails.configuration.settings['music_path'] + '/'
    song = Song.where(id: params[:id]).first

    send_file music_path + song.filename, :type => 'application/mp3', :filename => song.download_name
  end

  def add_to_session_filter
    session[:song_filter] = [] if session[:song_filter].nil?
    session[:song_filter] << params[:song_id]
    respond_to do |format|
      format.all do
        render json: {status: 'ok'}
      end
    end
  end

  def download
    output = `wget #{params[:url]} -O #{Rails.configuration.settings['music_path']}'/'#{params[:name]}.mp3`
    respond_to do |format|
      format.all do
        render json: {status: output}
      end
    end
  end

  # GET /song/1
  # GET /song/1.json
  def show
    headers['Access-Control-Allow-Origin'] = "*"
    @song = Song.find(params[:id])
    @songs = [@song]
    @playlist = session[:playlist].nil? ? [] : Song.where(id: session[:playlist])

    gon.music_host = Rails.configuration.settings['filehost']
    gon.songs = @songs
    gon.song = @song
    gon.comments = Comment.song(@song.id)
    gon.playlist = @playlist

    render 'index'
  end

  # GET /song/new
  def new
    @song = Song.new
  end

  # GET /song/1/edit
  def edit
  end

  # POST /song
  # POST /song.json
  def create
    @song = Song.new(song_params)

    respond_to do |format|
      if @song.save
        format.html { redirect_to @song, notice: 'Song was successfully created.' }
        format.json { render :show, status: :created, location: @song }
      else
        format.html { render :new }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /song/1
  # PATCH/PUT /song/1.json
  def update
    respond_to do |format|
      if @song.update(song_params)
        format.html { redirect_to @song, notice: 'Song was successfully updated.' }
        format.json { render :show, status: :ok, location: @song }
      else
        format.html { render :edit }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /song/1
  # DELETE /song/1.json
  def destroy
    @song.destroy
    respond_to do |format|
      format.html { redirect_to songs_url, notice: 'Song was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def prepare_fixed_assets
    session[:playlist] ||= []
    @header_image = ['/assets/headphones.jpg', '/assets/headphones2.jpg', '/assets/headphones3.jpg'].sample()
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_song
      @song = Song.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def song_params
      params.require(:song).permit(:song_id, :name, :code)
    end
end
