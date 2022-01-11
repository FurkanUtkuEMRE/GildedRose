import { expect } from "chai";
import { updateItems } from "../../app/gilded-rose";
import { ItemName } from "../../app/update-quality";

describe("Gilded Rose", () => {
  it("Quality and the remaining days for the common items should decrease when updated", () => {
    const [item] = updateItems([
      { name: ItemName.Common, sellIn: 10, quality: 10 },
    ]);

    expect(item.quality).to.equal(9);
    expect(item.sellIn).to.equal(9);
  });

  it("Quality of the common items should decrease twice as fast when there are no days remaining", () => {
    const [item] = updateItems([
      { name: ItemName.Common, sellIn: 0, quality: 10 },
    ]);

    expect(item.quality).to.equal(8);
  });

  it("Quality of the common items cannot be negative", () => {
    const [item] = updateItems([
      { name: ItemName.Common, sellIn: 10, quality: 0 },
    ]);

    expect(item.quality).to.be.at.most(0);
  });

  it("Quality of the common items cannot be more than fifty", () => {
    const [item] = updateItems([
      { name: ItemName.Common, sellIn: 10, quality: 50 },
    ]);

    expect(item.quality).to.be.below(50);
  });

  it("Quality of the aged brie should increase when updated", () => {
    const [item] = updateItems([
      { name: ItemName.AgedBrie, sellIn: 10, quality: 10 },
    ]);

    expect(item.quality).to.equal(11);
  });

  it("Quality of the Sulfuras cannot decrease and it is fixed at eighty", () => {
    const [item] = updateItems([
      { name: ItemName.Sulfuras, sellIn: 10, quality: 70 },
    ]);

    expect(item.quality).to.equal(80);
  });

  it("Quality of the backstage passes should increase when updated", () => {
    const [item] = updateItems([
      { name: ItemName.BackstagePass, sellIn: 20, quality: 20 },
    ]);

    expect(item.quality).to.equal(21);
  });

  it("Quality of the backstage passes should increase by two when there are ten days or less", () => {
    const [item] = updateItems([
      { name: ItemName.BackstagePass, sellIn: 10, quality: 10 },
    ]);

    expect(item.quality).to.equal(12);
  });

  it("Quality of the backstage passes should increase by three when there are five days or less", () => {
    const [item] = updateItems([
      { name: ItemName.BackstagePass, sellIn: 5, quality: 10 },
    ]);

    expect(item.quality).to.equal(13);
  });

  it("Quality of the backstage passes should drops to zero when the concert passes", () => {
    const [item] = updateItems([
      { name: ItemName.BackstagePass, sellIn: 0, quality: 10 },
    ]);

    expect(item.quality).to.equal(0);
  });

  it("Quality of the conjured items should decrease twice as fast", () => {
    const [item] = updateItems([
      { name: ItemName.Conjured, sellIn: 10, quality: 10 },
    ]);

    expect(item.quality).to.equal(8);
  });
});
