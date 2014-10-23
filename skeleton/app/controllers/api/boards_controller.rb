module Api
  class BoardsController < ApiController
    def create
      @board = current_user.boards.new(board_params)

      if @board.save
        render json: @board
      else
        render json: @board.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @board = current_user.boards.find(params[:id])
      @board.try(:destroy)
      render json: {}
    end

    def index
      @boards = current_user.boards
      render json: @boards
    end

    def show
      begin
        @board = Board.includes(:members, lists: :cards).find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: {error: "That board doesn't exist!"}, status: 404
        return
      end

      if @board && @board.is_member?(current_user)
        render :show
      else
        render json: {error: "You aren't a member of this board"}, status: 403
      end
    end

    private

    def board_params
      params.require(:board).permit(:title)
    end
  end
end
