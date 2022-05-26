import { filterItems } from './filter';

const keywords = [
  'อาคาร',
  'หลวง',
  'ค่าเช่ารถ',
  'จ้างเหมาบริการ',
  'ชาติ',
  'พระราชดำริ',
  'จ้างที่ปรึกษา',
  'ค่าไฟ',
  'เฉลิมพระเกียรติ',
  'พิธีการ',
  'ขุดลอก',
  'ค่าที่ดิน',
  'เสด็จ',
  'ถวาย',
  'ศาสน',
  'เครื่องปรับอากาศ',
  'กษัตริย์',
  'จัดงาน',
  'คุณธรรม',
  'ปัญญาประดิษฐ์',
  'มูลนิธิ',
  'Big Data',
  'ค่าน้ำ',
  'ข้อมูลขนาดใหญ่',
  'เทิดทูน',
  'โคโรนา',
  'BCG',
  'สถาบันหลัก',
  'เงินอุดหนุนทั่วไป',
  'แอปพลิเคชัน',
  'Covid',
  'อัธยาศัย',
  'ศีลธรรม',
  'โคกหนองนา',
  'ค่าจ้างผู้ปฏิบัติงานพิมพ์',
  'บล็อกเชน',
  'จัดอีเวนต์',
  'ยากจนพุ่งเป้า',
];

function extractingKeyword(items) {
  return keywords.reduce((prevArray, keyword) => {
    const filteredItems = filterItems(keyword, items);
    if (filteredItems.length > 0) {
      return [...prevArray, {
        word: keyword,
        count: filteredItems.length,
        summation: filteredItems.map((i) => i.AMOUNT).reduce((last, next) => last + Number(next.replaceAll(',', '')), 0),
      }];
    }
    return prevArray;
  }, []);
}
