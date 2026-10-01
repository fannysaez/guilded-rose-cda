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
      const item = this.items[i]; // raccourci : évite de répéter this.items[i] partout

      // évolution de la quality selon le type d'objet
      switch (item.name) {
        case "Aged Brie":
          this.increaseQuality(item);
          break;

        case "Backstage passes to a TAFKAL80ETC concert":
          this.increaseQuality(item); // +1 de base
          if (item.sellIn < 11) {
            this.increaseQuality(item); // +1 de plus si ≤10 jours (donc +2 au total)
          }
          if (item.sellIn < 6) {
            this.increaseQuality(item); // +1 de plus si ≤5 jours (donc +3 au total)
          }
          break;

        case "Sulfuras, Hand of Ragnaros":
          // ne change jamais
          break;

        default:
          // objet normal
          this.decreaseQuality(item);
      }
      // sellIn diminue chaque jour pour tout le monde sauf Sulfuras
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.sellIn = item.sellIn - 1;
      }

      // une fois périmé (sellIn < 0), règles spéciales de dégradation
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            // objet normal périmé : quality baisse encore de 1 (donc -2 au total ce jour-là)
            if (item.name != "Sulfuras, Hand of Ragnaros") {
              this.decreaseQuality(item);
            }
          } else {
            // Backstage passes périmé : le concert est passé, quality tombe à 0
            item.quality = 0;
          }
        } else {
          // Aged Brie périmé : continue d'augmenter encore de 1 (donc +2 au total ce jour-là)
          this.increaseQuality(item);
        }
      }
    }

    return this.items;
  }
}
