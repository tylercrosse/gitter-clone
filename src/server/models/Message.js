import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  username: String,
  text: String
});

export default mongoose.model('Message', messageSchema);
