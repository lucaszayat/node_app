const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url_video: { type: String, required: true },
  description: { type: String, required: false },
  hashtags: [{ type: String }],
  likes: { type: Number, default: 0 },
  comments: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String }]
});

module.exports = mongoose.model('Video', videoSchema);