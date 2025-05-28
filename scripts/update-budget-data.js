import {
  Object,
  Spreadsheet,
  Column,
  asString,
  asNumber,
  formatToCsv,
} from 'sheethuahua';
import { writeFile } from 'fs/promises';
import {
  CURRENT_FISCAL_YEAR,
  CURRENT_DATA_SHEET_NAME,
  CURRENT_DATA_URL,
} from '../src/constants';
import { extractingKeyword } from '../src/explore/keyword';

const sheetId = CURRENT_DATA_URL.split('/')[5];

export const budgetSheetSchema = Object({
  MINISTRY: Column('MINISTRY', asString()),
  BUDGETARY_UNIT: Column('BUDGETARY_UNIT', asString().optional()),
  BUDGET_PLAN: Column('BUDGET_PLAN', asString().optional()),
  OUTPUT: Column('OUTPUT', asString().optional()),
  PROJECT: Column('PROJECT', asString().optional()),
  CATEGORY_LV1: Column('CATEGORY_LV1', asString().optional()),
  CATEGORY_LV2: Column('CATEGORY_LV2', asString().optional()),
  CATEGORY_LV3: Column('CATEGORY_LV3', asString().optional()),
  CATEGORY_LV4: Column('CATEGORY_LV4', asString().optional()),
  CATEGORY_LV5: Column('CATEGORY_LV5', asString().optional()),
  CATEGORY_LV6: Column('CATEGORY_LV6', asString().optional()),
  ITEM_DESCRIPTION: Column('ITEM_DESCRIPTION', asString()),
  AMOUNT: Column('AMOUNT', asNumber()),
  FISCAL_YEAR: Column('FISCAL_YEAR', asNumber()),
});

console.log('Fetching data from Google Sheets ...');

const budgets = await Spreadsheet(sheetId, { headers: 1 }).get(
  CURRENT_DATA_SHEET_NAME,
  budgetSheetSchema
);

const currentYearBudgets = budgets.filter(
  (d) => d.FISCAL_YEAR === CURRENT_FISCAL_YEAR - 543
);

const outputCsv = `public/data/${CURRENT_FISCAL_YEAR}.csv`;

console.log(`Writing full output CSV to ${outputCsv} ...`);

await writeFile(outputCsv, formatToCsv(currentYearBudgets, budgetSheetSchema));

console.log(`Updating selectedKeyword.json ...`);

await writeFile(
  'src/selectedKeyword.json',
  JSON.stringify(extractingKeyword(currentYearBudgets))
);
