import mongoose from 'mongoose';

type PassType = {
  name: string;
  dob: Date;
};
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'Name Already Exists'],
    require: [true, 'Please Enter Name']
  },
  dob: {
    type: Date,
    unique: [true, 'Date Of Birth Already Exists'],
    require: [true, 'Please Enter Date Of Birth']
  }
});

export const Pass = mongoose.model<PassType>('Pass', schema);
