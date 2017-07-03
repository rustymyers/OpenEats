import React from 'react';
import { DirectionList } from '../components/DataList';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';


import data from './data';

test('DirectionList component test', () => {
  const component = createComponentWithIntl(
    <DirectionList data={ data.directions }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Add a new empty direction to the list.
  tree.children[0].children[0].children[0].children[8].props.onClick(
    { preventDefault() {} }
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // Then remove it.
  tree.children[0].children[0].children[0].children[8].children[3].children[0].children[0].props.onClick(
    { preventDefault() {} }, 8
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
