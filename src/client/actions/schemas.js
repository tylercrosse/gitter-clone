import { schema } from 'normalizr';

const messageSchema = new schema.Entity('messages', {}, {
  idAttribute: 'createdAt'
});

const convoSchema = new schema.Entity('convos', {}, {
  idAttribute: 'name'
});

const Schemas = {
  MESSAGE: messageSchema,
  MESSAGE_ARRAY: [messageSchema],
  CONVO: convoSchema,
  CONVO_ARRAY: [convoSchema]
};

export default Schemas;
