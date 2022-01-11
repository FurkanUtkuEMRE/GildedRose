export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // For all the items in the array.
    for (let i = 0; i < this.items.length; i++) {
      // If an item is not Aged Brie, means that the quality does not increase with age,
      // and Backstage Pass, means that the quality increases in a different way as it ages but
      // it goes down to zero after the concert is over
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // If the quality is higher than zero because quality cannot be negative.
        if (this.items[i].quality > 0) {
          // If the item is not Sulfuras so that it can be sold.
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // Then quality decreases day by day by one.
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
        // If an item is either an Aged Brie or a Backstage Pass.
      } else {
        // If the quality is lower than fifty because it cannot go higher.
        if (this.items[i].quality < 50) {
          // Then quality increases day by day by one.
          this.items[i].quality = this.items[i].quality + 1;
          // If the item is a Backstage Pass.
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // Quality increases by two if there are less than eleven days left.
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // Quality increases by three if there are less than six days left.
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // If an item is not Sulfuras it has to be sold within the sellIn days.
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // If there are no more days to sell the items.
      if (this.items[i].sellIn < 0) {
        // If the item is not Aged Brie as it ages.
        if (this.items[i].name != "Aged Brie") {
          // If the item is not a Backstage Pass as it has a special condition.
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // If the quality is higher than zero.
            if (this.items[i].quality > 0) {
              // If the item is not Sulfuras as it does not have sellIn value.
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                // Then quality decreases by one.
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
            // If the item is a Backstage Pass, quality goes down to zero.
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
          // Else the quality increases.
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
