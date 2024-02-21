import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: [{
      userId: {
          type: String,
      },
  }],
  loves: [{
      userId: {
          type: String,
      },
  }],
  numberOfLikes: {
      type: Number,
      default: 0,
  },
  numberOfLoves: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
