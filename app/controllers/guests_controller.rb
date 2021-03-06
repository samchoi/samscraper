class GuestsController < ApplicationController
  before_action :set_guest, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token, only: [:create, :update]

  layout 'guest_list'

  # GET /guests
  # GET /guests.json
  def index
    @guests = Guest.all
    gon.guests = @guests;
    @guest = Guest.new


    respond_to do |format|
      format.html { }
      format.csv { send_data @guests.to_csv }
    end
  end

  # GET /guests/1
  # GET /guests/1.json
  def show
  end

  def find_by_name()
    @guests = Guest.all
    gon.guests = @guests;
    @guest = Guest.find_by_name(params[:name])
    @guest ='reserved' if @guest && @guest.group.reserved
    respond_to do |format|
      format.all{ render json: @guest, methods: [:party] }
    end
  end

  # GET /guests/new
  def new
    @guest = Guest.new
  end

  # GET /guests/1/edit
  def edit
  end

  # POST /guests
  # POST /guests.json
  def create
    @guest = Guest.new(guest_params)

    respond_to do |format|
      if @guest.save
        format.html { redirect_to @guest, notice: 'Guest was successfully created.' }
        format.json { render :show, status: :created, location: @guest }
      else
        format.html { render :new }
        format.json { render json: @guest.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /guests/1
  # PATCH/PUT /guests/1.json
  def update
    respond_to do |format|
      if @guest.update(guest_params)

        #save guest rsvps
        Guest.update_party(params[:guest]['party'])
        Group.update(params[:guest]['group_id'], { reserved: true})
        format.html { redirect_to @guest, notice: 'Guest was successfully updated.' }
        format.json { render :show, status: :ok, location: @guest }
      else
        format.html { render :edit }
        format.json { render json: @guest.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /guests/1
  # DELETE /guests/1.json
  def destroy
    @guest.destroy
    respond_to do |format|
      format.html { redirect_to guests_url, notice: 'Guest was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_guest
      @guest = Guest.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def guest_params
      params.require(:guest).permit(:name, :address, :city, :state, :zipcode, :message, :dietary_restriction, :song_request, :country, :guest_count, :rsvp, :id, :created_at, :updated_at, :party, :group_id)
    end
end
