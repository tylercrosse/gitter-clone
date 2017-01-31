import React           from 'react';
import { shallow }     from 'enzyme';
import { Route }       from 'react-router';
import { createStore } from 'redux';
import rootReducer     from '../reducers/';
import Root            from './Root.jsx';
import App             from './App.jsx';

const setup = () => {
  const store = createStore(rootReducer);
  const wrapper = shallow(<Root store={store} />);

  return {
    wrapper
  };
};

describe('<Root />', () => {
  it('should render correct routes', () => {
    const { wrapper } = setup();
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component;
      return pathMap;
    }, {});
    expect(pathMap['/']).toBe(App);
  });
});
