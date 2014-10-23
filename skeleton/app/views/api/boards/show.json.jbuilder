# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :title, :updated_at)
json.user_email @board.user.email

unless @board.lists.empty?
	json.lists @board.lists do |list|
		json.(list, :title, :updated_at)

		unless list.cards.empty?
			json.cards list.cards do |card|
				json.(card, :title, :description, :updated_at)
			end
		end
	end
end