class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :url_check

  def template 
    render [self.controller_name, 'templates', params[:id]].join('/'), layout: nil 
  end

  def url_check
    #redirect_to '/' and return unless ['/guests', '/'].include?(request.path)
  end

end
