import { writeFile } from 'fs/promises';
import { fetchData66WithProvince } from '../src/data/data';
import { filterItems } from '../src/explore/filter';

const keywords = [
  'ที่ดิน',
  'ก่อสร้าง',
  'เงินอุดหนุน',
  'การแพทย์',
  'กีฬา',
  'ขยะ',
  'ขับเคลื่อน',
  'เกษตร',
  'ขนส่ง',
  'กษัตริย์',
  'ข้าราชการ',
  'ครุภัณฑ์',
  'ควบคุม',
  'คอมพิวเตอร์',
  'ซ่อมแซม',
  'ค่าจ้าง',
  'ค่าเช่า',
  'ค่าตอบแทน',
  'ค่าปรับ',
  'โคก',
  'เฉลิมพระเกียรติ',
  'ชลประทาน',
  'ชุมชน',
  'เชื้อเพลิง',
  'ตรวจสอบ',
  'ตลิ่ง',
  'ถนน',
  'ถ่ายโอน',
  'ผู้สูงอายุ',
  'ท่องเที่ยว',
  'ทางหลวง',
  'ท่าอากาศยาน',
  'ที่ทำการ',
  'ป้องกัน',
  'ที่ปรึกษา',
  'แผ่นดินไหว',
  'ที่พัก',
  'เทคโนโลยี',
  'นวัตกรรม',
  'บำรุง',
  'น้ำท่วม',
  'บรรเทา',
  'บริการ',
  'บ้านพัก',
  'ปฏิบัติการ',
  'ประปา',
  'บำเหน็จ',
  'บุคลากร',
  'บูรณาการ',
  'ประจำตำแหน่ง',
  'ประตูระบายน้ำ',
  'ปลอดภัย',
  'ฝึกอบรม',
  'พนักงาน',
  'พระราชดำริ',
  'พัฒนา',
  'พิการ',
  'ภูมิทัศน์',
  'ยานพาหนะ',
  'รถโดยสาร',
  'รถบรรทุก',
  'รถยนต์',
  'ริมแม่น้ำ',
  'โรงพยาบาล',
  'โรงเรียน',
  'วิทยาลัย',
  'วิทยาศาสตร์',
  'ศาลา',
  'ศึกษา',
  'เศรษฐกิจ',
  'สงเคราะห์',
  'สถาบัน',
  'สนับสนุน',
  'สมเด็จ',
  'สะพาน',
  'สัมมนา',
  'สาธารณสุข',
  'สำนักงาน',
  'สำรวจ',
  'สูบน้ำ',
  'ห้องปฏิบัติการ',
  'ออกแบบ',
  'อัตโนมัติ',
  'อาคาร',
  'อาหาร',
  'อุตสาหกรรม',
  'อุโมงค์',
];

export function extractingKeyword(items) {
  return keywords.reduce((prevArray, keyword) => {
    const filteredItems = filterItems(keyword, items);
    if (filteredItems.length > 0) {
      return [
        ...prevArray,
        {
          word: keyword,
          count: filteredItems.length,
          summation: filteredItems
            .map((i) => i.AMOUNT)
            .reduce((last, next) => last + Number(next.replaceAll(',', '')), 0),
        },
      ];
    }
    return prevArray;
  }, []);
}

const data = await fetchData66WithProvince();
const extracted = extractingKeyword(data);
writeFile('./src/selectedKeyword.json', JSON.stringify(extracted));
