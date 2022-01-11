// Exporting an Enum for the items names. Helps getting rid of the string in the main code.
export enum ItemName {
  Common = "Common",
  AgedBrie = "Aged Brie",
  Sulfuras = "Sulfuras, Hand of Ragnaros",
  BackstagePass = "Backstage Pass",
  Conjured = "Conjured",
}

// Exporting the Item type here. If changing this would not be restricted these would be
// in a seperate folder with specific item types such as common, aged brie etc.
export type Item = {
  sellIn: number;
  quality: number;
  name: ItemName;
};

// Return true if quality is less than fifty.
const isLessThanMaximum = (quality: number): boolean => quality < 50;

// Return true if quality is greater than zero.
const isGreaterThanMinimum = (quality: number): boolean => quality > 0;

// Returns true if the concert has passed.
const concertHasPassed = (sellIn: number): boolean => sellIn <= 0;

// Increases the quality by one if the quality is less than fifty.
const increaseQuality = (quality: number): number =>
  isLessThanMaximum(quality) ? quality + 1 : quality;

// Decreases the quality by one if the quality is greater than zero.
const decreaseQuality = (quality: number): number =>
  isGreaterThanMinimum(quality) ? quality - 1 : quality;

// Increases the quality specifically for the backstage passes. This way,
// if anyone was to add a new item type to the list, we could easily add a new
// set of instructions for that item type and keep using the same program without
// any issues whatsoever.
const increaseQualityForBackstagePass = (backstagePass: Item): number => {
  let newQuality = increaseQuality(backstagePass.quality);

  if (backstagePass.sellIn <= 10) {
    newQuality = increaseQuality(newQuality);
  }

  if (backstagePass.sellIn <= 5) {
    newQuality = increaseQuality(newQuality);
  }

  return newQuality;
};

// Gets the new quality depending on the days remaining to sell.
// If there are days left it gets the new quality from the functions above.
// If not, it calculates and gets the quality decrease two times as above.
const updateQuality = (item: Item, newQuality: number): number =>
  item.sellIn <= 0 ? newQuality - 1 : newQuality;

// Decreases the remaining days, namely sell in days, by one.
const decreaseSellIn = (item: Item): number => item.sellIn - 1;

// Updates the common items by spreading the previous members and calculating the rest,
// by using the functions above.
export const updateCommon = (common: Item): Item => {
  return {
    ...common,
    sellIn: decreaseSellIn(common),
    quality: updateQuality(common, decreaseQuality(common.quality)),
  };
};

// Updates the aged brie by increasing its quality by one as it ages.
export const updateAgedBrie = (agedBrie: Item): Item => {
  return {
    ...agedBrie,
    sellIn: decreaseSellIn(agedBrie),
    quality: updateQuality(agedBrie, increaseQuality(agedBrie.quality)),
  };
};

// Sulfuras, Hand of Ragnaros always has a fixed eighty quality, therefore this only
// spreads the previous members.
export const updateSulfuras = (sulfuras: Item): Item => {
  return {
    ...sulfuras,
    quality: 80,
  };
};

// Updates the backstage passes by using the specific function. If the sell in is zero,
// quality of the pass is zero.
export const updateBackstagePass = (backstagePass: Item): Item => {
  const sellIn = decreaseSellIn(backstagePass);

  return {
    ...backstagePass,
    sellIn,
    quality: !concertHasPassed(sellIn)
      ? updateQuality(
          backstagePass,
          increaseQualityForBackstagePass(backstagePass)
        )
      : 0,
  };
};

// Updates the conjured items, when an item is conjured, its quality decreases twice as fast.
export const updateConjuredItem = (conjuredItem: Item): Item => {
  const newQuality = decreaseQuality(decreaseQuality(conjuredItem.quality));

  return {
    ...conjuredItem,
    sellIn: decreaseSellIn(conjuredItem),
    quality: updateQuality(conjuredItem, newQuality),
  };
};
