# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150824232426) do

  create_table "comments", force: true do |t|
    t.string   "comment"
    t.integer  "user_id"
    t.date     "timestamp"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "song_id"
    t.integer  "comment_time"
  end

  create_table "groups", force: true do |t|
    t.string  "name",     limit: 22, null: false
    t.boolean "reserved"
  end

  create_table "guests", force: true do |t|
    t.string   "name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "message"
    t.text     "dietary_restriction"
    t.string   "song_request"
    t.string   "country"
    t.string   "rsvp"
    t.integer  "group_id"
  end

  create_table "managers", force: true do |t|
    t.string   "paypal_id"
    t.string   "venmo_id"
    t.string   "square_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "movies", force: true do |t|
    t.string   "name"
    t.string   "image"
    t.string   "file"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "image_source"
  end

  create_table "playlists", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "plays", force: true do |t|
    t.integer  "song_id"
    t.integer  "user_id"
    t.float    "lat"
    t.float    "long"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "songs", force: true do |t|
    t.integer  "song_id"
    t.string   "name"
    t.string   "code"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "filename"
    t.string   "mediaid"
    t.string   "artist"
    t.string   "title"
    t.string   "sitename"
    t.string   "posturl"
    t.string   "thumb_url_artist"
    t.string   "description"
    t.string   "itunes_link"
    t.string   "thumb_url"
    t.integer  "rank"
    t.boolean  "active"
  end

  create_table "songs_playlists", force: true do |t|
    t.integer "song_id"
    t.integer "playlist_id"
    t.integer "user_id"
  end

end
