import brandLists from "@/assets/brands";

type TRange = {
  from: number;
  to: number;
};
type TBrandRange = TRange & {
  extra: number[] | TRange;
};
type TBrandGroups = [string, any[]];
const isRange = (code: number, range: TRange): boolean =>
  code >= range.from && code <= range.to;

// const BrandDictionalyGroup = new Map<string, TBrandRange>([
//   ["ㄱ-ㄴ", { from: 44032, to: 45795, extra: [12593, 12594, 12596] }],
//   ["ㄷ-ㄹ", { from: 45796, to: 47559, extra: [12599, 12600, 12601] }],
//   ["ㅁ-ㅂ", { from: 47560, to: 49323, extra: [12609, 12610, 12611] }],
//   ["ㅅ-ㅇ", { from: 49324, to: 51087, extra: [12613, 12614, 12615] }],
//   ["ㅈ-ㅋ", { from: 51088, to: 53439, extra: [12616, 12617, 12618, 12619] }],
//   ["ㅍ-ㅎ", { from: 53440, to: 55203, extra: [12620, 12621, 12622] }],
//   ["A-Z", { from: 65, to: 90, extra: { from: 97, to: 122 } }],
//   ["0-9", { from: 48, to: 57, extra: [] }],
// ]);

// const WordMemory: TBrandGroups[] = [...BrandDictionalyGroup.keys()].map(
//   (item: string) => {
//     return [item, []];
//   }
// );
// const BrandDictionaly = new Map(WordMemory);

// const brandMap = brandLists
//   .map((item) => {
//     return [item.brand, item.brand[0]];
//   })
//   .reduce((map, cur) => {
//     if (cur && cur[1]) {
//       const code = cur[1].charCodeAt(0);
//       for (const [key, range] of BrandDictionalyGroup) {
//         if (
//           (Array.isArray(map.get(key)) && isRange(code, range)) ||
//           (Array.isArray(range.extra) && range.extra.includes(code)) ||
//           (!Array.isArray(range.extra) && isRange(code, range.extra))
//         ) {
//           const data = map.get(key) || [];
//           data.push({ label: cur[0] });
//           map.set(key, data);
//           break;
//         }
//       }
//     }
//     return map;
//   }, BrandDictionaly);

class WordDictionaly {
  private BrandDictionalyGroup = new Map<string, TBrandRange>([
    ["ㄱ-ㄴ", { from: 44032, to: 45795, extra: [12593, 12594, 12596] }],
    ["ㄷ-ㄹ", { from: 45796, to: 47559, extra: [12599, 12600, 12601] }],
    ["ㅁ-ㅂ", { from: 47560, to: 49323, extra: [12609, 12610, 12611] }],
    ["ㅅ-ㅇ", { from: 49324, to: 51087, extra: [12613, 12614, 12615] }],
    ["ㅈ-ㅋ", { from: 51088, to: 53439, extra: [12616, 12617, 12618, 12619] }],
    ["ㅍ-ㅎ", { from: 53440, to: 55203, extra: [12620, 12621, 12622] }],
    ["A-Z", { from: 65, to: 90, extra: { from: 97, to: 122 } }],
    ["0-9", { from: 48, to: 57, extra: [] }],
  ]);
  private WordMemory: any;

  private WordLists: any;

  constructor(words: string[]) {
    try {
      this.init();
      this.setWords(words);
    } catch (e) {
      console.error(e);
    }
  }
  init(): void {
    const keys = this.getKeys();
    this.WordMemory = new Map(keys.map((item: string) => [item, []]));
  }
  getKeys(): string[] {
    return Array.from(this.BrandDictionalyGroup.keys());
  }
  setWords(items: string[], separator = "") {
    const temp = items;
    const wordFormat = this.makeWordFormat(temp);
    this.WordMemory = wordFormat.reduce((map, cur) => {
      if (cur && cur[1]) {
        const code = cur[1].charCodeAt(0);
        for (const [key, range] of this.BrandDictionalyGroup) {
          if (
            (Array.isArray(map.get(key)) && isRange(code, range)) ||
            (Array.isArray(range.extra) && range.extra.includes(code)) ||
            (!Array.isArray(range.extra) && isRange(code, range.extra))
          ) {
            const data = map.get(key) || [];
            data.push({ label: cur[0] });
            map.set(key, data);
            break;
          }
        }
      }
      return map;
    }, this.WordMemory);
  }
  getValues(key: string): string[] {
    return this.WordMemory.get(key);
  }

  private makeWordFormat(items: string[]) {
    return items.map((item) => {
      return [item, item[0]];
    });
  }
}
export default WordDictionaly;
