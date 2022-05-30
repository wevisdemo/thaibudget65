import React, { useState } from 'react';
import ResultGroup from './ResultGroup';
import ResultGroupModal from './ResultGroupModal';
import RatioCompare from './ResultRatioCompare';

function ResultSummary({ result }) {
  const [modalGroupByField, setModalGroupByField] = useState(null);
  const groupByFields = [
    {
      name: 'หน่วยรับงบ',
      key: 'budgetaryUnits',
    },
    {
      name: 'แผนงาน',
      key: 'plans',
    },
    {
      name: 'โครงการ/ผลผลิต',
      key: 'projects',
    },
    {
      name: 'จังหวัด',
      key: 'provinces',
    },
  ];

  return (
    <div>
      <RatioCompare
        total={result && result.total}
        budgetYearTotal={result && result.totalYearBudget}
      />
      {groupByFields.map((gby) => (
        <ResultGroup
          groupName={gby.name}
          items={result && result.groupBy[[gby.key]]}
          onSeeMore={() => setModalGroupByField(gby)}
          brief
        />
      ))}
      {modalGroupByField && (
        <ResultGroupModal
          groupName={modalGroupByField.name}
          items={result.groupBy[[modalGroupByField.key]]}
          onClose={() => setModalGroupByField(null)}
        />
      )}
    </div>
  );
}

export default ResultSummary;
