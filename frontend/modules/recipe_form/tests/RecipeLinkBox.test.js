import React from 'react';
import RecipeLinkBox from '../components/RecipeLinkBox';
import createComponentWithIntl from '../../../jest_mocks/createComponentWithIntl';

test('RecipeLinkBox component test', () => {
  const component = createComponentWithIntl(
    <RecipeLinkBox/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
