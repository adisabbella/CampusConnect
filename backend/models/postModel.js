const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title : { type: String, required: true },

    authorId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    content : {type: String, required: true},

    tags : [String],
    
    likes: {
    type: Number,
    default: 0
    },

    
},
{
  timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;