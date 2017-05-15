import React from 'react';
import TagList from '../components/TagList';
import renderer from 'react-test-renderer';

test('TagList tests', () => {
  const component = renderer.create(
    <TagList tags={ [{'title': 'testme'}, {'title': 'testmetoo'}] }/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TagList tests', () => {
  const component = renderer.create(
    <TagList tags={ [{'title': 'There was a problem'}] } errors="O no!"/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
