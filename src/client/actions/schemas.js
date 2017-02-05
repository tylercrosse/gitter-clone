import { schema } from 'normalizr';

const messageSchema = new schema.Entity('messages', {}, {
  idAttribute: 'createdAt'
});

const Schemas = {
  MESSAGE: messageSchema,
  MESSAGE_ARRAY: [messageSchema]
};

export default Schemas;
