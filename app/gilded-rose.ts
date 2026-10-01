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

  private increaseQuality(item: Item): void {
    // augmente la quality de 1, sans jamais dépasser 50
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  private decreaseQuality(item: Item): void {
    // diminue la quality de 1, sans jamais descendre sous 0
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      switch (item.name) {
        case "Aged Brie":
          this.increaseQuality(item);
          item.sellIn = item.sellIn - 1;
          if (item.sellIn < 0) {
            this.increaseQuality(item); // périmé : augmente encore
          }
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          this.increaseQuality(item); // +1 de base
          if (item.sellIn < 11) {
            this.increaseQuality(item); // +1 si ≤10 jours
          }
          if (item.sellIn < 6) {
            this.increaseQuality(item); // +1 si ≤5 jours
          }
          item.sellIn = item.sellIn - 1;
          if (item.sellIn < 0) {
            item.quality = 0; // concert passé
          }
          break;

        case "Sulfuras, Hand of Ragnaros":
          // ne change jamais, sellIn ne bouge pas non plus
          break;

        case "Conjured Mana Cake":
          this.decreaseQuality(item);
          this.decreaseQuality(item); // 2x plus vite qu'un objet normal
          item.sellIn = item.sellIn - 1;
          if (item.sellIn < 0) {
            this.decreaseQuality(item);
            this.decreaseQuality(item); // 2x plus vite aussi une fois périmé
          }
          break;

        default:
          // objet normal
          this.decreaseQuality(item);
          item.sellIn = item.sellIn - 1;
          if (item.sellIn < 0) {
            this.decreaseQuality(item); // périmé : baisse encore
          }
      }
    }

    return this.items;
  }
}
