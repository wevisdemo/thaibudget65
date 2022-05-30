import React, { createContext, useContext, useMemo } from 'react';

export const numberingSystemContext = createContext([null, () => {}]);

export const useNumberingSystem = () => {
  const [numberingSystem, setNumberingSystem] = useContext(
    numberingSystemContext
  );

  const toggleNumberingSystem = () =>
    setNumberingSystem(numberingSystem ? null : 'thai');

  const [formatNumber, formatInteger, formatFractions] = useMemo(() => {
    const formatter = new Intl.NumberFormat(
      'th-TH',
      numberingSystem ? { numberingSystem } : {}
    );

    const decimalFormatter = new Intl.NumberFormat('th-TH', {
      maximumFractionDigits: 3,
      minimumFractionDigits: 3,
      ...(numberingSystem ? { numberingSystem } : {}),
    });

    return [
      (number) => formatter.format(number).replace(',', ''),
      (number) => formatter.format(number),
      (number) => decimalFormatter.format(number),
    ];
  }, [numberingSystem]);

  return {
    numberingSystem,
    toggleNumberingSystem,
    formatNumber,
    formatInteger,
    formatFractions,
  };
};
