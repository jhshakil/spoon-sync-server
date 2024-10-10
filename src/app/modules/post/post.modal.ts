import { model, Schema } from 'mongoose';
import { TAction, TComment, TPost, TRatting, TTag } from './post.interface';

const actionSchema = new Schema<TAction>({
  type: { type: String, enum: ['up', 'down'] },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const commentSchema = new Schema<TComment>({
  text: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const rattingSchema = new Schema<TRatting>({
  count: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const tagSchema = new Schema<TTag>({
  id: { type: String },
  text: { type: String },
});

const postSchema = new Schema<TPost>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    email: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String },
    content: { type: String },
    tags: { type: [tagSchema], default: [] },
    status: {
      type: String,
      enum: ['published', 'draft', 'blocked'],
      default: 'published',
    },
    isDeleted: { type: Boolean, default: false },
    totalUpVote: { type: String, default: '0' },
    totalDownVote: { type: String, default: '0' },
    totalComment: { type: String, default: '0' },
    averageRatting: { type: String, default: '' },
    action: { type: [actionSchema], default: [] },
    comment: { type: [commentSchema], default: [] },
    ratting: { type: [rattingSchema], default: [] },
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
