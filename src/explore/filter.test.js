import { groupBy } from "./filter";

describe('groupBy', () => {
  it('should group items according to prop names', () => {
    const items = [
      { BUDGETARY_UNIT: 'กรมทางหลวง', AMOUNT: 1_000_000 },
      { BUDGETARY_UNIT: 'กรมประชาสัมพันธ์', AMOUNT: 2_000_000 },
    ];

    const grouped = groupBy('BUDGETARY_UNIT', items);

    expect(grouped).toHaveLength(2);
    expect(grouped).toContainEqual({ name: 'กรมทางหลวง', total: 1_000_000, items: [items[0]] });
    expect(grouped).toContainEqual({ name: 'กรมประชาสัมพันธ์', total: 2_000_000, items: [items[1]] });
  });

  it('should sum up amount in the same group', () => {
    const items = [
      { BUDGETARY_UNIT: 'กรมทางหลวง', AMOUNT: 1_000_000 },
      { BUDGETARY_UNIT: 'กรมทางหลวง', AMOUNT: 2_000_000 },
    ];

    const grouped = groupBy('BUDGETARY_UNIT', items);

    expect(grouped).toEqual([
      { name: 'กรมทางหลวง', total: 3_000_000, items },
    ]);
  });

  it('should not group items that does not have the targeted properties', () => {
    const items = [
      { BUDGETARY_UNIT: 'กรมทางหลวง', BUDGET_PLAN: 'แผนงานบุคลากรภาครัฐ', AMOUNT: 1_000_000 },
      { BUDGETARY_UNIT: 'กรมประชาสัมพันธ์', AMOUNT: 2_000_000 },
    ];

    const grouped = groupBy('BUDGET_PLAN', items);

    expect(grouped).toEqual([
      { name: 'แผนงานบุคลากรภาครัฐ', total: 1_000_000, items: [items[0]] },
    ]);
  });

  it('should consider multiple properties name as a key', () => {
    const items = [
      { PROJECT: 'โครงการการส่งเสริมประสิทธิภาพด้านการคุ้มครองผู้บริโภค', AMOUNT: 1_000_000 },
      { OUTPUT: 'การบริหารจัดการงานทั่วไป', AMOUNT: 2_000_000 },
    ];

    const grouped = groupBy(['PROJECT', 'OUTPUT'], items);

    expect(grouped).toHaveLength(2);
    expect(grouped).toContainEqual({ name: 'โครงการการส่งเสริมประสิทธิภาพด้านการคุ้มครองผู้บริโภค', total: 1_000_000, items: [items[0]] });
    expect(grouped).toContainEqual({ name: 'การบริหารจัดการงานทั่วไป', total: 2_000_000, items: [items[1]] });
  });
});
