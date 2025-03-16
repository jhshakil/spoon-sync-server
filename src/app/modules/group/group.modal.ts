import { model, Schema } from 'mongoose';
import { TGroup } from './group.interface';

const groupSchema = new Schema<TGroup>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    admins: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    logo: { type: String },
    banner: { type: String },
    status: {
      type: String,
      enum: ['active', 'disabled', 'blocked'],
      default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

groupSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
groupSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const Group = model<TGroup>('Group', groupSchema);
