import { HistoryTableProps } from "@/models/interfaces/HistoryTable.interface";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./HistoryTable.module.css";
import { CopyToClipboardButton } from "@/common/CopyToClipboardButton";
import { TFunction } from "i18next";
import { PromptMessage } from "@/models/types/prompt.type";

const TableHeader = () => {
  return <div></div>;
};

interface TableRowProps {
  index: number;
  translate: TFunction<"translation", undefined>;
  promptMessage: PromptMessage;
}

const TableRow = (props: TableRowProps) => {
  const { index, translate, promptMessage } = props;
  return (
    <Row className={styles.page_prompt_area_row}>
      <Col className="text-light">
        <div className="fs-5 text-light"> {index + 1}</div>
      </Col>
      <Col xs={12} md={2} lg={2} className="pb-2 ">
        <Col className="fs-5 text-light" xs={12} md={12}>
          <b> {translate("table.input.title")}</b>
        </Col>
        <div className={styles.page_prompt_area_textfield}>
          {promptMessage.input_message}
        </div>
      </Col>
      <Col xs={12} md={2} lg={2} className="pb-2 ">
        <Col className="fs-5 text-light" xs={12} md={6} lg={12}>
          <b> {translate("table.type.title")}</b>
        </Col>
        <Col sm className="pt-2">
          <div className={styles.page_prompt_area_combobox}>
            {" "}
            {promptMessage.tone}
          </div>
        </Col>
      </Col>
      <Col xs={12} md={4} lg={5} xl={5} className="pb-2">
        <Col className="fs-5 text-light" xs={12} md={6} lg={12}>
          <b> {translate("table.massage.title")}</b>
        </Col>
        <div className="pt-1 text-light">
          <Container fluid={true} className="">
            <Row>
              <Col className="d-flex p-0 justify-content-end">
                <CopyToClipboardButton message={"result_message"} />
              </Col>
              <Col
                xs={12}
                className=" text-light p-0 mb-3"
                style={{
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "none",
                }}
              >
                {promptMessage.result_message}
              </Col>
            </Row>
          </Container>
        </div>
      </Col>
      <Col xs={12} md={3} lg={2} xl={2} className="pb-2">
        <Col className="fs-5 text-light d-flex justify-content-between align-items-center">
          <b> {translate("createAt")}</b>
        </Col>
        <div className="text-light"> {promptMessage.date_time.toLocaleString()}</div>
      </Col>
    </Row>
  );
};

/* 


*/

export const HistoryTable = (props: HistoryTableProps) => {
  const { translate, promptMessages } = props;
  return (
    <div className="bg-dark">
      <Container className={styles.page_container}>
        <Container fluid={true} className={styles.page_prompt_area}>
          {promptMessages.map((promptMessage, index) => (
            <TableRow
              key={index}
              translate={translate}
              promptMessage={promptMessage}
              index={index}
            />
          ))}
        </Container>
      </Container>
    </div>
  );
};
