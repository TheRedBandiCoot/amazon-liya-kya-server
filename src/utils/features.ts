import mongoose from 'mongoose';

export const connectDB = (uri: string) => {
  mongoose
    .connect(uri, {
      dbName: 'amazon_liya_kya'
    })
    .then(res => console.log(`Connected DB : ${res.connection.port}`))
    .catch(err => console.log(err));
};
