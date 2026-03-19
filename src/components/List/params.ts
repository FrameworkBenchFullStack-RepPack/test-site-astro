import { isSortStrategy, SortStrategy } from "./sortStrategy";

export const defaultFilters = {
  page: 1,
  sort: SortStrategy.Name,
  ageFrom: 0,
  ageTo: 100,
};

export interface Filters {
  sticky: boolean;
  size: number;
  page: number;
  sort: SortStrategy;
  ageFrom: number;
  ageTo: number;
  categories: number[];
}

export interface Config {
  sticky?: boolean;
  size: number;
}

export function parseParams(
  url: URL,
  { sticky, size }: Config,
): Config & Filters {
  const params = url.searchParams;
  const sortParam = params.get("sort");

  const categories = params
    .getAll("category")
    .map((id) => parseNum(id, 1, undefined))
    .filter((id) => id !== undefined);

  return {
    sticky: sticky ?? params.get("sticky") === "true",
    size: parseNum(params.get("size"), 1, size),
    page: parseNum(params.get("page"), 1, defaultFilters.page),
    sort: isSortStrategy(sortParam) ? sortParam : defaultFilters.sort,
    ageFrom: parseNum(params.get("age-from"), 0, defaultFilters.ageFrom),
    ageTo: parseNum(params.get("age-to"), 0, defaultFilters.ageTo),
    categories,
  };
}

function parseNum<T>(
  candidate: string | null,
  min: number,
  def: T,
): number | T {
  if (candidate === null) return def;
  const num = Number.parseInt(candidate);
  if (Number.isSafeInteger(num) && num >= min) return num;
  return def;
}
