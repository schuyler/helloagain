'use strict';

import * as actions from '../../actions/contact'

describe('toggleActive', () => {
  it('should return an action', () => {
    let bob = {name: "Bob"};
    expect(
      actions.toggleActive(bob)
    ).toMatchSnapshot()
  })
})
