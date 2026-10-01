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
      // objet normal (ni Aged Brie, ni Backstage passes)
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
          this.decreaseQuality(this.items[i]); // ↓ quality (Sulfuras ne bouge jamais)
        }
      } else {
        // Aged Brie ou Backstage passes : la quality augmente
        this.increaseQuality(this.items[i]); // +1 de base pour les deux

        if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
          // Backstage passes : bonus selon le nombre de jours restants
          if (this.items[i].sellIn < 11) {
            this.increaseQuality(this.items[i]); // +1 de plus si ≤10 jours (donc +2 au total)
          }
          if (this.items[i].sellIn < 6) {
            this.increaseQuality(this.items[i]); // +1 de plus si ≤5 jours (donc +3 au total)
          }
        }
      }

      // sellIn diminue chaque jour pour tout le monde sauf Sulfuras
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // une fois périmé (sellIn < 0), règles spéciales de dégradation
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // objet normal périmé : quality baisse encore de 1 (donc -2 au total ce jour-là)
            if (this.items[i].quality > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            // Backstage passes périmé : le concert est passé, quality tombe à 0
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          // Aged Brie périmé : continue d'augmenter encore de 1 (donc +2 au total ce jour-là)
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
