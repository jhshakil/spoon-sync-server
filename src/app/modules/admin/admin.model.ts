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
  profileImage: { type: String },
  phoneNumber: { type: String },
});

export const Admin = model<TAdmin>('Admin', adminSchema);
