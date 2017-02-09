import mongoose from 'mongoose';

const { Schema } = mongoose;
const convoSchema = Schema({
  name: {
    type: String,
    unique: true,
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }]
}, {timestamps: true});

export default mongoose.model('Convo', convoSchema);
