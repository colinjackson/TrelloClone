json.(@card, :id, :title, :description, :updated_at)

unless @card.items.empty?
  json.items @card.items do |item|
    json.(item, :id, :title, :done, :updated_at)
  end
end
