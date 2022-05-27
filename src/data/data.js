import Papa from 'papaparse';
import { provinces } from '../provinces';
import readFile from './readFile';

function isNodeEnv() {
  return typeof window === 'undefined';
}

const matchedProvinces = (province) => {
  let matched = [];
  provinces.forEach((p) => {
    // eslint-disable-next-line no-unused-expressions
    province.includes(p) ? matched = [...matched, p] : null;
  });
  return matched.join('-');
};

export async function fetchData66WithProvince() {
  let raw;
  if (isNodeEnv()) {
    raw = await readFile('./public/data65.csv', 'utf8');
  } else {
    raw = (await fetch(`${process.env.PUBLIC_URL}/data65.csv`)).text();
  }

  return new Promise((resolve, reject) => {
    Papa.parse(raw, {
      header: true,
      delimiter: ',',
      complete: (results) => {
        const mapped = results.data.map((item) => ({
          ...item,
          PROVINCE: matchedProvinces(item.ITEM_DESCRIPTION),
        }));
        resolve(mapped);
      },
      error: reject,
    });
  });
}
