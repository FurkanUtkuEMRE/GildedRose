// Importing the functions needed for the calculations from the logic file.
import {
  ItemName,
  Item,
  updateCommon,
  updateAgedBrie,
  updateSulfuras,
  updateBackstagePass,
  updateConjuredItem,
} from "./update-quality";

export const updateItems = (items: Item[]): Item[] => {
  // Mapping the array and using update functions depending on the item type.
  return items.map((item) => {
    if (item.name === ItemName.AgedBrie) {
      return updateAgedBrie(item);
    }

    if (item.name === ItemName.Sulfuras) {
      return updateSulfuras(item);
    }

    if (item.name === ItemName.BackstagePass) {
      return updateBackstagePass(item);
    }

    if (item.name === ItemName.Conjured) {
      return updateConjuredItem(item);
    }

    return updateCommon(item);
  });
};
