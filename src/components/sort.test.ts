import { Item } from '../types';

import { returnLarger } from './sort';

describe('returnLarger', () => {
  const base: Omit<Item, 'set' | 'box' | 'itemID'> = {
    orderID: 'order1',
    status: 'unPicked',
  };

  it('sorts by set alphabetically', () => {
    const a: Item = { ...base, set: 'Alpha', box: 1, itemID: 'a' };
    const b: Item = { ...base, set: 'Beta', box: 1, itemID: 'b' };
    expect(returnLarger(a, b)).toBeLessThan(0);
    expect(returnLarger(b, a)).toBeGreaterThan(0);
  });

  it('sorts by box number if set is equal', () => {
    const a: Item = { ...base, set: 'Alpha', box: 1, itemID: 'a' };
    const b: Item = { ...base, set: 'Alpha', box: 2, itemID: 'b' };
    expect(returnLarger(a, b)).toBeLessThan(0);
    expect(returnLarger(b, a)).toBeGreaterThan(0);
  });

  it('sorts by itemID if set and box are equal', () => {
    const a: Item = { ...base, set: 'Alpha', box: 1, itemID: 'a' };
    const b: Item = { ...base, set: 'Alpha', box: 1, itemID: 'b' };
    expect(returnLarger(a, b)).toBeLessThan(0);
    expect(returnLarger(b, a)).toBeGreaterThan(0);
  });

  it('handles null/undefined set or box', () => {
    const a: Item = { ...base, set: '', box: null, itemID: 'a' };
    const b: Item = { ...base, set: 'Alpha', box: 1, itemID: 'b' };
    expect(returnLarger(a, b)).toBeGreaterThan(0);
    expect(returnLarger(b, a)).toBeLessThan(0);
  });

  it('returns 0 if all fields are equal', () => {
    const a: Item = { ...base, set: 'Alpha', box: 1, itemID: 'a' };
    const b: Item = { ...base, set: 'Alpha', box: 1, itemID: 'a' };
    expect(returnLarger(a, b)).toBe(0);
  });
}); 