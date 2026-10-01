import { Item, GildedRose } from "@/gilded-rose";

describe("objet normal", () => {
  // tests sur un item classique

  it("diminue la quality et le sellIn d'un objet normal de 1 chaque jour", () => {
    const gildedRose = new GildedRose([new Item("foo", 10, 20)]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it("la quality ne descend jamais en dessous de 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 10, 0)]);
    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
  });
});

describe("Aged Brie", () => {
  // tests sur le fromage qui s'améliore avec le temps

  it("augmente sa quality chaque jour", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]); // sellIn=10, quality=20
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].quality).toBe(21); // quality augmente au lieu de baisser
  });
});

describe("Sulfuras", () => {
  // tests sur l'objet légendaire, immuable

  it("ne change jamais (ni quality, ni sellIn)", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80), // objet légendaire
    ]);
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].sellIn).toBe(10); // sellIn inchangé
    expect(items[0].quality).toBe(80); // quality inchangée
  });
});

describe("Backstage passes", () => {
  // tests sur les places de concert, paliers de quality

  it("augmente de 1 quand il reste plus de 10 jours", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20), // sellIn=15, quality=20
    ]);
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].sellIn).toBe(14); // sellIn baisse normalement
    expect(items[0].quality).toBe(21); // quality augmente de 1
  });

  it("augmente de 2 quand il reste 10 jours ou moins", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), // pile à la limite des 10 jours
    ]);
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(22); // +2 au lieu de +1
  });

  it("augmente de 3 quand il reste 5 jours ou moins", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20), // pile à la limite des 5 jours
    ]);
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(23); // +3 au lieu de +1
  });
});

describe("dégradation après la date de péremption (sellIn < 0)", () => {
  it("un objet normal perd 2 de quality par jour une fois périmé", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 20)]); // sellIn=0, quality=20
    const items = gildedRose.updateQuality(); // sellIn passe à -1 (périmé)

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(18); // -2 au lieu de -1
  });

  it("Aged Brie continue d'augmenter sa quality même périmé", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 20)]); // sellIn=0, quality=20
    const items = gildedRose.updateQuality(); // sellIn passe à -1

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(22); // Aged Brie augmente 2x plus vite une fois périmé
  });

  it("Backstage passes tombe à 0 juste après le concert", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20), // sellIn=0 = jour du concert
    ]);
    const items = gildedRose.updateQuality(); // le concert est passé, sellIn devient -1

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0); // la quality chute à 0
  });
});
