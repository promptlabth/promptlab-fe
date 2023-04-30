import { isTh, t } from "@/components/language";
import ToggleSwitch from "@/components/starndart/ToggleSwitch";
import { useLanguage } from "@/language/ LanguageContext";
import { ChangeEvent, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";


const PrivacyPolicy = () => {
    const { language, setLanguage } = useLanguage();
    const [isTh, setIsTh] = useState(true);

    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        setIsTh(event.target.checked);

        const newLanguage = event.target.checked ? 'th' : 'en';
        setLanguage(newLanguage);

    };
    return (
        <Container className="text-light text-center bg-dark" >
            <Container fluid className="pt-5 pb-2" style={{ backgroundColor: "#1F1F21" }}>
                <figure className="text-center pt-4 pb-4 text-light">
                    <blockquote className="blockquote">
                        <p className="display-4">Public Policy</p>
                    </blockquote>

                </figure>
                <Container className="text-light text-center">
                    <h3>{t("language", language)}</h3>
                    <ToggleSwitch isOn={isTh} handleToggle={handleToggle} />
                    <p>{isTh ? 'TH' : 'EN'}</p>
                    <Container className="d-flex justify-content-center">
                    </Container>
                </Container>

            </Container>
            <Col className="pb-2">
                <Container>
                    ในฐานะผู้พัฒนาและทีมงานของเว็บไซต์ Prompt Lab (www.prompt.sutmeme.com) ทางทีมงานได้ตระหนักถึงความสำคัญของความเป็นส่วนตัวของผู้ใช้ทุกท่าน เราจึงให้ควาามเชื่อมั่นแก่ทุกท่านว่าข้อมูลส่วนบุคคลทั้งหมดของท่านจะได้รับความคุ้มครองและ
                    รับประกันว่าจะปกป้องและประมวลผลข้อมูลส่วนบุคคลด้วยมาตรการรักษาความมั่นคงปลอดภัยที่เหมาะสม
                    อย่างดีที่สุดและด้วยชอบด้วยกฏหมาย

                </Container>

                <Container>
                    ทางทีมงานอาจปรับปรุงนโยบายความเป็นส่วนตัวฉบับนี้ตามแต่ละระยะเวลา เพื่อให้สอดคล้องกับแนวปฏิบัติและกฎหมายที่เกี่ยวข้อง และให้สอดคล้องกับการให้บริการต่างๆ ทั้งนี้ ทางทีมงานจะแจ้งให้ท่านทราบถึงการเปลี่ยนแปลง ด้วยการประกาศนโยบายฉบับปรับปรุงใหม่ผ่านทางเว็บไซต์

                </Container>

                <Container className="display-6">
                    การเก็บข้อมูลส่วนบุคคล
                </Container>

                <text className="text-light text-start">

                    <br /> 1. ข้อมูลส่วนบุคคล
                    <br /> 2. ข้อมูลที่ไม่สามารถระบุตัวตน
                    <br /> 3. ข้อมูลการใช้งาน
                    <br /> 4. คุกกี้และเทคโนโลยีติดตาม
                </text>

                <text className="text-light text-start">
                    “ข้อมูลส่วนบุคคล” คือ ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรงหรือทางอ้อม โดยที่เรานั้นได้รวบรวมข้อมูลส่วนบุคคลในกรณีที่จำเป็นและใช้ข้อมูลเท่านั้น การเก็บข้อมูลส่วนบุคคลจะเกิดขึ้นอยู่ 3 กรณี ได้แก่
                    <br /> 1. เมื่อมีการเข้าสู่ระบบ
                    <br /> 2. เมื่อมีการกดคลิ๊กเข้าโฆษณา
                    <br /> 3. เมื่อมีการกดสร้างข้อความ
                </text>

                <Container className="display-6">
                    เราจะนำข้อมูลส่วนบุคคลไปใช้อะไรบ้าง
                </Container>

                <text>
                    <br /> 1. การปรับปรุงและพัฒนาผลิตภัณฑ์และบริการ
                    <br /> 2. การสื่อสารกับผู้ใช้งาน
                    <br /> 3. การวิเคราะห์และทำสถิติ
                    <br /> 4. การตรวจสอบความปลอดภัยและป้องกันการโจมตี
                    <br /> <br />  .การปฏิบัติตามข้อกำหนดและกฎหมายที่เกี่ยวข้อง
                </text>


                <Container className="display-6">
                    การแชร์ข้อมูลกับบุคคลที่สาม
                </Container>


                <text>
                    <br /> 1. คู่ค้าและผู้ให้บริการ
                    <br /> 2. การนำข้อมูลไปใช้ในกรณีขายหรือควบคุมธุรกิจ
                    <br /> 3. การเปิดเผยข้อมูลตามข้อกำหนดและกฎหมาย
                </text>

                <Container className="display-6">
                    การแชร์ข้อมูลกับบุคคลที่สาม
                </Container>


                <text>
                    <br /> 1. คู่ค้าและผู้ให้บริการ
                    <br /> 2. การนำข้อมูลไปใช้ในกรณีขายหรือควบคุมธุรกิจ
                    <br /> 3. การเปิดเผยข้อมูลตามข้อกำหนดและกฎหมาย
                </text>

                <Container className="display-6">
                    การจัดเก็บข้อมูลและความปลอดภัย

                </Container>


                <text>
                    เราให้ความสำคัญในการรักษาความปลอดภัยของข้อมูลของผู้ใช้ ดังนั้น เรามีนโยบายในการจัดเก็บข้อมูลเพื่อให้เป็นไปตามมาตรการความปลอดภัยที่เหมาะสม วิธีการจัดเก็บข้อมูลของเราประกอบด้วยการเก็บข้อมูลแบบเข้ารหัสและเก็บไว้ที่เซิร์ฟเวอร์บนคลาวด์
                    ทีมงาน Prompt Lab อาจไม่สามารถลบข้อมูลทั้งหมดของท่านออกจากฐานข้อมูลของทีมงาน Prompt Lab ได้อย่างสมบูรณ์โดยไม่มีข้อมูลที่เหลืออยู่เนื่องจากการสำรองข้อมูลและเหตุผลอื่นๆ ทีมงาน Prompt Lab จะเก็บรักษาข้อมูลของท่านตราบเท่าที่ข้อมูลนั้นยังจำเป็นสำหรับวัตถุประสงค์ของการรวบรวมข้อมูล ในกรณีที่ท่านยุติความสัมพันธ์ทางธุรกิจกับทีมงาน Prompt Lab ไปแล้ว ทีมงาน Prompt Lab จะจัดเก็บข้อมูลส่วนบุคคลของท่านไว้เป็นระยะเวลา 10 ปี ซึ่งเป็นไปตามที่กฎหมายกำหนด เช่น กฎหมายว่าด้วยการบัญชี กฎหมายว่าด้วยการป้องกันและปราบปรามการฟอกเงิน กฎหมายภาษีอากร และตามนโยบาย คู่มือต่างๆ ในเรื่องการจัดเก็บและทำลายเอกสารต่างๆ ของทีมงาน Prompt Lab และเมื่อสิ้นสุดระยะเวลาในการเก็บแล้วทีมงาน Prompt Lab จะทำการลบทำลาย หรือทำให้ข้อมูลดังกล่าวไม่สามารถระบุถึงตัวบุคคลได้
                </text>


                <Container className="display-6">
                    สิทธิของผู้ใช้งาน
                </Container>


                <text>
                    <br /> 1. สิทธิในการเข้าถึงข้อมูล
                    <br /> 2. สิทธิในการแก้ไขข้อมูล
                    <br /> 3. สิทธิในการลบข้อมูล
                    <br /> 4. สิทธิในการยกเลิกความยินยอม
                </text>

            </Col>
        </Container>

    );
}



export default PrivacyPolicy 