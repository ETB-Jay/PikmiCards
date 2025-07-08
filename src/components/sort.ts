import { Item } from "../types";

/**
 * @description returnLarger compares two Items by set, then box, then itemID
 */
export function returnLarger(item1: Item, item2: Item): number {
  const shallowCompare = (first: string | number | null, second: string | number | null) => {
    if (!first) { return 1; }
    if (!second) { return -1; }
    if (first > second) { return 1; }
    if (first < second) { return -1; }
    return 0;
  };
  let result = shallowCompare(item1.set, item2.set);
  if (result !== 0) { return result; }
  result = shallowCompare(item1.box, item2.box);
  if (result !== 0) { return result; }
  result = shallowCompare(item1.itemID, item2.itemID);
  return result;
}

