class Guest < ActiveRecord::Base
  belongs_to :group

  attr_accessor :party

  def party
    group.guests
  end

  def self.update_party(guests)
    update_rsvp(guests, 'yes')
    update_rsvp(guests, 'no')
  end  

  def self.update_rsvp(guests, status)
    ids_with_rsvp_status = guests.inject([]) { |r, e| r << e['id'] if e['rsvp'] == status; r; }
    where(id: ids_with_rsvp_status).update_all(rsvp: status)
  end


  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |guest|
        csv << guest.attributes.values_at(*column_names)
      end
    end
  end

end
