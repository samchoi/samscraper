class SongController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:add_to_session_playlist, :add_to_session_filter]

  # GET /song
  # GET /song.json
  def index
    redirect_to home_path and return unless browser.chrome?
    @songs = Song.where.not(id: session[:song_filter]).select{ |s| !s.filename.nil?}
    @song = @songs.sample
    gon.music_host = Rails.configuration.settings['filehost']
    @playlist = session[:playlist].nil? ? [] : Song.find(session[:playlist])
  end

  def home

  end

  def add_to_session_playlist
    session[:playlist] = [] if session[:playlist].nil?
    session[:playlist] << params[:song_id]

    @songs = Song.find(session[:playlist])

    respond_to do |format|
      format.all do
        render json: { html: render_to_string(partial: 'shared/playlist', formats: [:json, :html], layout: false, locals: {playlist: @songs}) }
      end
    end
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
