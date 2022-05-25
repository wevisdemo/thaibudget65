import React, { useState } from 'react';
import KeywordListItem from './KeywordListItem';
import Section from './Section';

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

const KEYWORD_HEADER_STRING = 'คำสำคัญ';
const AMOUNT_UNIT_HEADER_STRING = 'ล้านบาท';
const TITLE_STRING = 'คำสำคัญในรายละเอียดงบ';
function KeywordList({ onKeywordChange }) {
  const [checkedIndex, setCheckedIndex] = useState(0);

  return (
    <div className="flex flex-col w-full">
      <Section title={TITLE_STRING}>
        <table className="border-collapse w-full">
          <tr>
            <th> </th>
            <th className="text-left text-sm text-[#828282] font-normal">{KEYWORD_HEADER_STRING}</th>
            <th className="text-right text-sm text-[#828282] font-normal">{AMOUNT_UNIT_HEADER_STRING}</th>
            <th> </th>
          </tr>
          {keywords.map((v, i) => (
            <KeywordListItem
              keyword={v}
              count={400}
              total={31442}
              checked={checkedIndex === i}
              onCheck={() => { setCheckedIndex(i); onKeywordChange(v); }}
            />
          ))}
        </table>
      </Section>
    </div>
  );
}

export default KeywordList;
