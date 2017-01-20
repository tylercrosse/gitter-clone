import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router';
import Root from './Root.jsx';
import App from './App.jsx';

const setup = () => {
  const store = {
    messages: []
  };

  const wrapper = shallow(<Root store={store} />);

  return {
    store,
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
