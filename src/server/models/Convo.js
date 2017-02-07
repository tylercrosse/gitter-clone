import mongoose from 'mongoose';

const convoSchema = mongoose.Schema({
  name: String
}, {timestamps: true});

export default mongoose.model('Convo', convoSchema);
