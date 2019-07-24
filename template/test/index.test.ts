import { expect } from 'chai';
import 'mocha';
import { getRandomNumber } from '../src';

describe('getRandomNumber', () => {
  it('should return random number', () => {
    expect(getRandomNumber()).eq(4);
  });
});

