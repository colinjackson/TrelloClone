# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :title, :updated_at)
json.user_email @board.user.email

unless @board.lists.empty?
	json.lists @board.lists do |list|
		json.(list, :id, :title, :ord)

		unless list.cards.empty?
			json.cards list.cards do |card|
				json.(card, :id, :title, :description, :ord)
			end
		end
	end
end
