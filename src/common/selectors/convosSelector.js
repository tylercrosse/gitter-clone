import { createSelector } from 'reselect';

const allConvosSelector = (state) => Object.values(state.convos);

// select only confos where direct == false
const convosSelector = createSelector(
  allConvosSelector,
  (allConvos) => allConvos.filter((convo) => !convo.direct)
);

export default convosSelector;
