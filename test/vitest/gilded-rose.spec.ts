  import { Item, GildedRose } from '@/gilded-rose';

  describe('objet normal', () => { // tests sur un item classique (ex: 'foo')

    it('diminue la quality et le sellIn d\'un objet normal de 1 chaque jour', () => {
      const gildedRose = new GildedRose([new Item('foo', 10, 20)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });

    it('la quality ne descend jamais en dessous de 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 10, 0)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
    });

  });

    describe('Aged Brie', () => { // tests sur le fromage qui s'améliore avec le temps

    it('augmente sa quality chaque jour', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]); // sellIn=10, quality=20
      const items = gildedRose.updateQuality(); // simule 1 jour

      expect(items[0].quality).toBe(21); // quality augmente au lieu de baisser
    });

  });

    describe('Sulfuras', () => { // tests sur l'objet légendaire, immuable

    it('ne change jamais (ni quality, ni sellIn)', () => {
      const gildedRose = new GildedRose([
        new Item('Sulfuras, Hand of Ragnaros', 10, 80), // objet légendaire
      ]);
      const items = gildedRose.updateQuality(); // simule 1 jour

      expect(items[0].sellIn).toBe(10); // sellIn inchangé
      expect(items[0].quality).toBe(80); // quality inchangée
    });

  });
