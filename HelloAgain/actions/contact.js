'use strict'

import { TOGGLE_ACTIVE } from './types';

export const toggleActive = (friend) => {
  return { type: TOGGLE_ACTIVE, friend: friend }
}
