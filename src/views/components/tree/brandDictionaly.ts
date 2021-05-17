/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Iword {
  brand: string;
}
interface IwordRange {
  from: number;
  to: number;
}
interface IwordExtra extends IwordRange {
  extra: number[] | IwordRange;
}

export class WordFilterClass {
  protected _filterKeys: string[] = [];
  protected _filterOriginData: any[] = [];
  protected _filterGroups: any;
  protected _filterLegendsKeys: string[] = [];
  protected _filterLegends = new Map([
    ["", { legend: "전체", code: 0, from: 0, to: 0 }],

    ["ㄱ", { legend: "ㄱ-ㄴ", code: 12593, from: 44032, to: 45795 }],
    ["ㄲ", { legend: "ㄱ-ㄴ", code: 12594, from: 44032, to: 45795 }],
    ["ㄴ", { legend: "ㄱ-ㄴ", code: 12596, from: 44032, to: 45795 }],

    ["ㄷ", { legend: "ㄷ-ㄹ", code: 12599, from: 45796, to: 47559 }],
    ["ㄸ", { legend: "ㄷ-ㄹ", code: 12600, from: 45796, to: 47559 }],
    ["ㄹ", { legend: "ㄷ-ㄹ", code: 12601, from: 45796, to: 47559 }],

    ["ㅁ", { legend: "ㅁ-ㅂ", code: 12609, from: 47560, to: 49323 }],
    ["ㅂ", { legend: "ㅁ-ㅂ", code: 12610, from: 47560, to: 49323 }],
    ["ㅃ", { legend: "ㅁ-ㅂ", code: 12611, from: 47560, to: 49323 }],

    ["ㅅ", { legend: "ㅅ-ㅇ", code: 12613, from: 49324, to: 51087 }],
    ["ㅆ", { legend: "ㅅ-ㅇ", code: 12614, from: 49324, to: 51087 }],
    ["ㅇ", { legend: "ㅅ-ㅇ", code: 12615, from: 49324, to: 51087 }],

    ["ㅈ", { legend: "ㅈ-ㅋ", code: 12616, from: 51088, to: 53439 }],
    ["ㅉ", { legend: "ㅈ-ㅋ", code: 12617, from: 51088, to: 53439 }],
    ["ㅊ", { legend: "ㅈ-ㅋ", code: 12618, from: 51088, to: 53439 }],
    ["ㅋ", { legend: "ㅈ-ㅋ", code: 12619, from: 51088, to: 53439 }],

    ["ㅌ", { legend: "ㅌ-ㅎ", code: 12620, from: 53440, to: 55203 }],
    ["ㅍ", { legend: "ㅌ-ㅎ", code: 12621, from: 53440, to: 55203 }],
    ["ㅎ", { legend: "ㅌ-ㅎ", code: 12622, from: 53440, to: 55203 }],

    ["low", { legend: "A-Z", code: 0, from: 97, to: 122 }],
    ["upp", { legend: "A-Z", code: 0, from: 65, to: 90 }],

    ["num", { legend: "0-9", code: 0, from: 48, to: 57 }],
  ]);

  constructor(words: any[]) {
    try {
      this.init();
      this.setData(words);
      this.makeFilterGroups();
    } catch (err) {
      console.log(err);
    }
  }

  private init() {
    const temp: any[] = [];
    this._filterLegends.forEach((item, key) => {
      if (!this._filterKeys.includes(item.legend)) {
        this._filterKeys.push(item.legend);
        temp.push([item.legend, []]);
      }
      this._filterLegendsKeys.push(key);
    });
    this._filterGroups = new Map<string, any[]>(temp);
  }
  private isNumber(code: number) {
    return this.isRange(code, this._filterLegends.get("num"));
  }

  private isAlphabet(code: number) {
    return (
      this.isRange(code, this._filterLegends.get("low")) ||
      this.isRange(code, this._filterLegends.get("upp"))
    );
  }

  private isHangul(code: number) {
    if (this._filterLegends.has(String.fromCharCode(code))) {
      return String.fromCharCode(code);
    } else {
      const keyIndex = Math.floor((code - 44032) / 588) + 1;
      return this._filterLegendsKeys[keyIndex];
    }
  }

  protected isRange(code: number, range: any) {
    return code >= range.from && code <= range.to;
  }

  protected getLegendKey(str: string) {
    const code = str.charCodeAt(0);
    if (this.isAlphabet(code)) {
      return this._filterLegends.get("low")?.legend;
    } else if (this.isNumber(code)) {
      return this._filterLegends.get("num")?.legend;
    } else {
      const chosung = this.isHangul(code);
      if (chosung) {
        return this._filterLegends.get(chosung)?.legend;
      } else {
        return this._filterLegends.get("num")?.legend;
      }
    }
  }

  setData(datas: string[]) {
    this._filterOriginData = datas;
  }

  getKeys() {
    return this._filterKeys;
  }

  getFilter(key: string) {
    if (key === "전체") {
      return Array.from(this._filterGroups.values()).reduce(
        (result: any[], item) => result.concat(item),
        []
      );
    } else {
      return this._filterGroups.has(key) ? this._filterGroups.get(key) : [];
    }
  }

  makeFilterGroups() {
    console.time("makeFilterGroups");
    this._filterOriginData.forEach((item: string) => {
      const key = this.getLegendKey(item);
      const data = this._filterGroups.get(key) || [];
      data.push(item);
      this._filterGroups.set(key, data);
    });
    console.timeEnd("makeFilterGroups");
  }
}

type TBrandData = {
  brand: string;
  brandSeq: number;
  brandSynonyms: string[];
};
export class BrandFilters extends WordFilterClass {
  setData(datas: any[]): void {
    this._filterOriginData = datas.sort((a: TBrandData, b: TBrandData) =>
      a.brand > b.brand ? 1 : -1
    );
  }

  makeFilterGroups() {
    console.time("makeFilterGroups");
    this._filterOriginData.forEach((item) => {
      const key = this.getLegendKey(item.brand);
      // console.log(":::", key);
      const data = this._filterGroups.get(key) || [];
      data.push(item as never);
      this._filterGroups.set(key, data);
    });
    console.timeEnd("makeFilterGroups");
  }
}
