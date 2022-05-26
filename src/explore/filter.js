/*
interface FilterResult {
  keyword: string;
  totalYearBudget: number;
  total: number;
  groupBy: {
    budgetaryUnits: GroupByResult[];    -> BUDGETARY_UNIT
    projects: GroupByResult[];          -> PROJECT || OUTPUT
    plans: GroupByResult[];             -> BUDGET_PLAN
    provinces: GroupByResult[];
  };
  items: Item[];
}

interface GroupByResult {
  name: string;
  total: number;
  items: Item[];
}
*/

/**
 * Group items using propName (or multiple propNames) and return array of `GroupByResult`
 * @param {(string|string[])} propName(s) The property name to group by
 * @param {array} matchedItems Items that wanted to grouped by
 * @return {array} See `GroupByResult` declared in TypeScript in the comment above
 */
export function groupBy(propName, items) {
  let propNames;
  if (!Array.isArray(propName)) {
    propNames = [propName];
  } else {
    propNames = propName;
  }

  const mapped = items.reduce((result, item) => {
    if (!propNames.some((p) => item[p])) {
      return result;
    }

    const targetProp = propNames.find((p) => item[p]);
    const key = item[targetProp];
    if (!result[key]) {
      // eslint-disable-next-line no-param-reassign
      result[key] = { name: key, total: 0, items: [] };
    }

    // eslint-disable-next-line no-param-reassign
    result[key].total += Number(item.AMOUNT.replaceAll(',', ''));
    result[key].items.push(item);
    return result;
  }, {});

  return Object.values(mapped);
}

/**
 * Filter all Items with keyword and return matched items
 * @param {string} keyword The keyword to search in Items
 * @param {array} items All Items available
 * @return {array} Matched items
 */
export function filterItems(keyword, items) {
  return items.filter((item) => (item.BUDGET_PLAN.includes(keyword)
      || item.OUTPUT.includes(keyword)
      || item.PROJECT.includes(keyword)
      || item.CATEGORY_LV1.includes(keyword)
      || item.CATEGORY_LV2.includes(keyword)
      || item.CATEGORY_LV3.includes(keyword)
      || item.CATEGORY_LV4.includes(keyword)
      || item.CATEGORY_LV5.includes(keyword)
      || item.CATEGORY_LV6.includes(keyword)
      || item.ITEM_DESCRIPTION.includes(keyword))
      && item.FISCAL_YEAR === '2023');
}

/**
 * Filter all Items with keyword.
 * @param {string} keyword The keyword to search in Items
 * @param {array} items All Items available
 * @return {object} See `FilterResult` declared in TypeScript in the comment above
 */
export function filter(keyword, items) {
  const filtered = filterItems(keyword, items);
  const total = filtered.map((i) => i.AMOUNT).reduce((last, next) => last + Number(next.replaceAll(',', '')), 0);
  const budgetaryUnits = groupBy('BUDGETARY_UNIT', filtered);
  const projects = groupBy(['PROJECT', 'OUTPUT'], filtered);
  const plans = groupBy('BUDGET_PLAN', filtered);
  const provinces = groupBy('PROVINCE', filtered);

  return {
    keyword,
    totalYearBudget: 3_000_302_000_000,
    total,
    groupBy: {
      budgetaryUnits,
      projects,
      plans,
      provinces,
    },
    items: filtered,
  };
}
