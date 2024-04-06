import mongoose, { Document } from 'mongoose';
import validator from 'validator';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  photo: string;
}

const schema = new mongoose.Schema({
  _id: {
    type: String,
    require: [true, 'Please Enter ID']
  },
  name: {
    type: String,
    require: [true, 'Please Enter Name']
  },
  email: {
    type: String,
    unique: [true, 'Email Already Exists'],
    require: [true, 'Please Enter Email'],
    validate: [validator.default.isEmail, 'Not Validate']
  },
  photo: {
    type: String,
    require: [true, 'Please Enter Photo']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

export const User = mongoose.model<IUser>('User', schema);
