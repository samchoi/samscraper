class SongsController < ApplicationController
  before_action :set_song, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:add_to_session_playlist, :add_to_session_filter]

  # GET /songs
  # GET /songs.json
  def index
    redirect_to building_path and return unless browser.chrome?
    @songs = Song.where.not(id: session[:song_filter])
    @song = @songs.sample
    @playlist = session[:playlist].nil? ? [] : Song.find(session[:playlist])
  end

  def coming

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
      send_file "/path/to/file.mp3", :type=>"audio/mp3", :filename => "filenamehere.mp3"
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
    @song = Song.find(params[:id])
  end

  # GET /songs/new
  def new
    @song = Song.new
  end

  # GET /songs/1/edit
  def edit
  end

  # POST /songs
  # POST /songs.json
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

  # PATCH/PUT /songs/1
  # PATCH/PUT /songs/1.json
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

  # DELETE /songs/1
  # DELETE /songs/1.json
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
