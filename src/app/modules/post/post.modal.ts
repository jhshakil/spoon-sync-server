import { model, Schema } from 'mongoose';
import { TAction, TComment, TPost } from './post.interface';

const actionSchema = new Schema<TAction>({
  type: { type: String, enum: ['up', 'down'] },
  authId: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Auth',
  },
});

const commentSchema = new Schema<TComment>({
  text: { type: String },
  authId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
  },
});

const postSchema = new Schema<TPost>(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String },
    content: { type: String },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ['published', 'draft', 'blocked'],
      default: 'published',
    },
    isDeleted: { type: Boolean, default: false },
    totalUpVote: { type: String },
    totalDownVote: { type: String },
    totalComment: { type: String },
    action: [actionSchema],
    comment: [commentSchema],
  },
  {
    timestamps: true,
  },
);

postSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
postSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const Post = model<TPost>('Post', postSchema);
