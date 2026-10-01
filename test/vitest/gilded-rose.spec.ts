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
