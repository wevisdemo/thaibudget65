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
 * Filter all Items with keyword.
 * @param {string} keyword The keyword to search in Items
 * @return {object} See `FilterResult` declared in TypeScript in the comment above
 */
export function filter(keyword) {
  const budgetaryUnits = [{
    name: 'กรมทางหลวง',
    total: 579_926_000_000,
    items: [],
  }];

  const projects = [{
    name: 'โครงการก่อสร้างโครงข่ายทางหลวงแผ่น...',
    total: 579_926_000_000,
    items: [],
  }];

  const plans = [{
    name: 'แผนงานบูรณาการพัฒนาด้านคมนาคม...',
    total: 579_926_000_000,
    items: [],
  }];

  const provinces = [{
    name: 'กรุงเทพมหานคร',
    total: 579_926_000_000,
    items: [],
  }];

  return {
    keyword,
    totalYearBudget: 3_000_302_000_000,
    total: 579_926_000_000,
    groupBy: {
      budgetaryUnits,
      projects,
      plans,
      provinces,
    },
    items: [],
  };
}

/**
 * Filter all Items with keyword and return matched items
 * @param {string} keyword The keyword to search in Items
 * @return {array} Matched items
 */
export function filterItems(keyword) {
  return {
    ITEM_ID: '2022.3.5.2360',
    REF_DOC: '2022.3.5',
    REF_PAGE_NO: '214',
    MINISTRY: 'กระทรวงคมนาคม',
    BUDGETARY_UNIT: 'กรมทางหลวง',
    CROSS_FUNC: 'TRUE',
    BUDGET_PLAN: 'แผนงานบูรณาการพัฒนาด้านคมนาคมและระบบโลจิสติกส์',
    OUTPUT: 'โครงการก่อสร้างโครงข่ายทางหลวงแผ่นดิน',
    PROJECT: '',
    CATEGORY_LV1: 'งบลงทุน',
    CATEGORY_LV2: 'ค่าครุภัณฑ์ ที่ดินและสิ่งก่อสร้าง',
    CATEGORY_LV3: 'ค่าที่ดินและสิ่งก่อสร้าง',
    CATEGORY_LV4: 'ค่าที่ดิน',
    CATEGORY_LV5: '',
    CATEGORY_LV6: '',
    ITEM_DESCRIPTION: 'ค่าชดเชยสังหาริมทรัพย์และอสังหาริมทรัพย์ในการเวนคืนที่ดิน ในเขตการก่อสร้างทางหลวงทั่วประเทศ สำนักจัดกรรมสิทธิ์ที่ดิน',
    FISCAL_YEAR: '2022',
    AMOUNT: '1,461,848,600',
    OBLIGED: 'FALSE',
    DEBUG_LOG: '',
  };
}