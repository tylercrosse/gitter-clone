const error = (state = null, action) => {
  if (action.error) return action.error;
  return false;
};

export default error;
