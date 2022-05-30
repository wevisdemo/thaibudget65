import React from 'react';
import { Link } from 'react-router-dom';
import WvSharer from '@wevisdemo/ui/components/sharer';

const IndexPage = () => (
  <div className="flex flex-col wv-font-anuphan wv-b5">
    <div className="flex flex-col items-center text-center bg-gray-3 text-gray-2 py-16 px-4">
      <h1 className="wv-font-kondolar wv-font-black wv-h3 text-gray-1">
        สำรวจงบประมาณปี 66
      </h1>
      <p className="wv-b2 max-w-lg">
        ภาษีเรา.. เอาไปใช้อะไรบ้าง? ชวนมาติดตาม ตั้งคำถาม
        และปกป้องภาษีทุกบาทของพวกเรากัน
      </p>
      <p className="mt-6 max-w-2xl">
        ประชาชนนับสิบล้านจ่ายภาษีทางตรงและทางอ้อมทุกวันทุกปี
        อยากขอดูหน่อยว่าเอาเงินเราไปใช้อะไร แต่เปิดมาเจองบประมาณรายจ่ายเกือบ 30
        เล่ม จะเปิดดูทีละเล่ม เฮ้อ.. เป็นท้อ!!
      </p>
      <p className="mt-2 max-w-2xl">
        เราขอเยียวยาความเจ็บปวดของประชาชนผู้เสียภาษี ใครกำลังท้อ
        แต่ก็ไม่หยุดสงสัยว่าภาษีเรา.. เอาไปใช้อะไรบ้าง มาลองช่วยกันค้นหา
        ตั้งคำถาม และส่งเสียงออกไป เพื่อปกป้องภาษีทุกบาทของพวกเรากัน
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 my-12 gap-4">
        <PageCard
          to="/treemap"
          title="สำรวจผ่านโครงสร้าง"
          image="/images/tree-aw.webp"
        >
          สำรวจโครงสร้างงบประมาณปี 66 แบ่งตามหน่วยงานและจังหวัดที่ได้รับงบ
        </PageCard>
        <PageCard
          to="/explore"
          title="สำรวจผ่านคีย์เวิร์ด"
          image="/images/keyword-aw.webp"
        >
          สำรวจงบประมาณปี 66 ผ่านคำที่พบบ่อยหรือคำที่น่าสนใจ
        </PageCard>
      </div>
      <WvSharer url={process.env.PUBLIC_URL} />
    </div>

    <div className="flex flex-col items-center bg-black py-16 px-4 space-y-4">
      <h2 className="wv-font-kondolar wv-font-black wv-h4">Disclaimer</h2>
      <p className="max-w-2xl indent-8 text-gray-3">
        ข้อมูลที่แสดงบนเว็บไซต์นี้ มาจากร่างพระราชบัญญัติงบประมาณรายจ่าย
        (ฉบับที่ 3 ขาว-แดง) ประจำปีงบประมาณ พ.ศ. 2566 โดย
        <ExternalLink href="https://www.bb.go.th/topic3.php?catID=1377&gid=860&mid=544">
          สำนักงบประมาณ
        </ExternalLink>{' '}
        โดยใช้โปรแกรมคอมพิวเตอร์แปลงข้อมูลเป็น Machine-Readable Format
        และตรวจสอบอีกครั้งโดยทีมงาน ส่วนในการแสดงผลส่วนต่างๆ
        มาจากการค้นหาและตัดคำเบื้องต้นโดยคอมพิวเตอร์ข้อมูล
        โปรดตรวจสอบบริบทอีกครั้งก่อนการใช้งาน
        หากต้องการแจ้งข้อผิดพลาน/เสนอแนะเพิ่มเติม สามารถแจ้งทีมงานได้ที่{' '}
        <ExternalLink href="https://airtable.com/shryu4errnlj1LWsM">
          https://airtable.com/shryu4errnlj1LWsM
        </ExternalLink>
      </p>
    </div>
  </div>
);

const PageCard = ({ to, title, children, image }) => (
  <Link to={to}>
    <div className="h-full bg-white flex flex-col items-center p-6 pb-0 rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <p className="wv-b2 wv-font-bold text-black pb-2">{title}</p>
      <p className="flex-1">{children}</p>
      <img src={`${process.env.PUBLIC_URL}${image}`} alt={title} />
    </div>
  </Link>
);

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-gray-2 hover:underline"
  >
    {children}
  </a>
);

export default IndexPage;
