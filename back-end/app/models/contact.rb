class Contact < ActiveRecord::Base
	validates :first_name, :last_name, :phone, 
		presence: true, 
		length: {
			minimum: 6, minimum: 3 
		}
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
	validates :email,
		presence: true,  
		format: { with: VALID_EMAIL_REGEX },
		length: {
			maximum: 244
		}
end
