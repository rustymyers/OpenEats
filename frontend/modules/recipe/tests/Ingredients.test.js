import React from 'react';
import Ingredients from '../components/Ingredients';
import renderer from 'react-test-renderer';

import data from './data';

test('Ingredient component test', () => {
  const component = renderer.create(
    <Ingredients data={ data.ingredients }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
