import React from 'react';
import Link from '../Link.react' ;
import renderer from 'react-test-renderer'
import sp from '../SearchPage';

test('renders learn react link', () => {
  const tree = renderer
.create(  <sp/> )
.toJSON();
expect(tree).toMatchSnapshot();
});
