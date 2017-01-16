import 'react-native';
import React from 'react';
import HelloAgain from '../../containers/app'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders something', () => {
  const tree = renderer.create(
    <HelloAgain />
  );
});
