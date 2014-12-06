Rails.application.assets.register_engine '.haml', Tilt::HamlTemplate

Rails.application.config.assets.precompile += %w( guest.js )

Rails.application.config.assets.precompile += %w( audio.js )
Rails.application.config.assets.precompile += %w( home.js )
Rails.application.config.assets.precompile += %w( mobile.js )
Rails.application.config.assets.precompile += %w( visualizer.js )

Rails.application.config.assets.precompile += %w( application.css )
Rails.application.config.assets.precompile += %w( audios.css )
Rails.application.config.assets.precompile += %w( home.css )
Rails.application.config.assets.precompile += %w( mobile.css )