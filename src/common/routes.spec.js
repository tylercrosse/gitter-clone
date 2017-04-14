import React       from 'react';
import { shallow } from 'enzyme';
import toJson      from 'enzyme-to-json';
import Routes,
  { routes }       from './routes';

describe('routes', () => {
  it('should match snapshot', () => {
    expect(routes).toMatchSnapshot();
  });
});

describe('<Routes />', () => {
  it('should render correctly', () => {
    const component = <Routes />;
    const wrapper = shallow(component);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
