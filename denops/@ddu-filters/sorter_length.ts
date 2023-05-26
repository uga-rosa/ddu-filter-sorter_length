import {
  BaseFilter,
  DduItem,
} from "https://deno.land/x/ddu_vim@v2.8.5/types.ts";

type Params = {
  order: "asc" | "desc";
};

export class Filter extends BaseFilter<Params> {
  // deno-lint-ignore require-await
  override async filter(args: {
    items: DduItem[];
    filterParams: Params;
  }): Promise<DduItem[]> {
    const { items, filterParams } = args;
    const compareFn = filterParams.order === "asc"
      ? (a: DduItem, b: DduItem) => a.word.length - b.word.length
      : (a: DduItem, b: DduItem) => b.word.length - a.word.length;
    return Promise.resolve(items.sort(compareFn));
  }

  override params(): Params {
    return {
      order: "asc",
    };
  }
}
