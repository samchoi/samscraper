json.array!(@guests) do |guest|
  json.extract! guest, :id, :name, :status, :address, :city, :state, :zipcode
  json.url guest_url(guest, format: :json)
end
