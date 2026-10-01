import { Item, GildedRose } from '@/gilded-rose'; // import des classes à tester

describe('Gilded Rose', () => { // regroupe tous les tests du fichier

  it('diminue la quality et le sellIn d\'un objet normal de 1 chaque jour', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 20)]); // objet normal : sellIn=10, quality=20
    const items = gildedRose.updateQuality(); // simule le passage d'1 jour

    expect(items[0].sellIn).toBe(9); // sellIn a baissé de 1
    expect(items[0].quality).toBe(19); // quality a baissé de 1
  });

  it('la quality ne descend jamais en dessous de 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 10, 0)]); // quality déjà à 0
    const items = gildedRose.updateQuality(); // simule 1 jour de plus

    expect(items[0].quality).toBe(0); // reste à 0, ne passe pas en négatif
  });

    it('Aged Brie augmente sa quality chaque jour', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]); // sellIn=10, quality=20
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].quality).toBe(21); // quality augmente au lieu de baisser
  });

  it('Sulfuras ne change jamais (ni quality, ni sellIn)', () => {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 10, 80), // objet légendaire
    ]);
    const items = gildedRose.updateQuality(); // simule 1 jour

    expect(items[0].sellIn).toBe(10); // sellIn inchangé
    expect(items[0].quality).toBe(80); // quality inchangée
  });
});
