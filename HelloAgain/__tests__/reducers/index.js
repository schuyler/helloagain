'use strict';

import mainReducer from '../../reducers'

describe('main reducer', () => {
  it('should have friends', () => {
    expect(
      mainReducer(undefined, {}).friends
    ).toBeDefined();
  })
})
