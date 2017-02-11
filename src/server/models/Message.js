import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  username: String,
  text: String,
  rawMarkup: String,
  convo: {
    type: String,
    ref: 'Convo'
  }
}, {timestamps: true});

export default mongoose.model('Message', messageSchema);
