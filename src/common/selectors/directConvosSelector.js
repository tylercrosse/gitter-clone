import { createSelector } from 'reselect';

const allConvosSelector = (state) => Object.values(state.convos);

// select only confos where direct == true
export const directConvosSelector = createSelector(
  allConvosSelector,
  (allConvos) => allConvos.filter((convo) => convo.direct)
);

export default directConvosSelector;
