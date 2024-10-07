import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>({
  authId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'Auth',
  },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profileImage: {
    type: String,
    default:
      'https://firebasestorage.googleapis.com/v0/b/spoon-sync-image.appspot.com/o/files%2Fa974d006-66a2-4205-b42f-12cc14141b8f?alt=media&token=f61c46c8-f5a9-4df0-8b8c-32ebb361aa75',
  },
  phoneNumber: { type: String },
  isDeleted: { type: Boolean, default: false },
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
