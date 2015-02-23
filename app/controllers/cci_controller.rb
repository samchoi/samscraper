class CciController < ApplicationController

  layout 'basic'

  def index    

  end

  def wsi
    render layout: 'wsi'
  end


end
