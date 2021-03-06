Rails.application.routes.draw do
  resources :playlists

  resources :groups

  resources :guests do
    get 'template/:id' => 'guests#template'      
  end

  resources :cci do
    
  end

  resources :comments

  resources :movies

  resources :managers

  resources :plays

  resources :song do
    get 'template/:id' => 'song#template'
  end

  get 'wsi' => 'cci#wsi'  
  get '/' => 'song#index', as: 'music'
  get 'sam' => 'song#home'
  get 's' => 'song#download'
  get 'search/:term' => 'song#search'

  get 'dl/:name' => 'song#send_zip', as: 'download_zip'
  get 'ds/:id' => 'song#send_song', as: 'download_song'
  post 'q.json' => 'song#add_to_session_playlist', as: 'add_to_playlist'
  get 'reset' => 'song#clear', as: 'reset'
  post 'remove.json' => 'song#add_to_session_filter', as: 'remove'
  get 'm' => 'song#mobile', as: 'mobile'

  get 'guest_search/:name' => 'guests#find_by_name'
  get 'random/:count' => 'song#random'      
  get 'media/:mediaid' => 'song#mediaid'
  get 'code' => 'code#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
