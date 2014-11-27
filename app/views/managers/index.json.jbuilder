json.array!(@managers) do |manager|
  json.extract! manager, :id, :paypal_id, :venmo_id, :square_id, :name
  json.url manager_url(manager, format: :json)
end
