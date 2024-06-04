import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { LoginUser } from "@/models/types/loginUser.type";
import { Prompt } from "@/models/types/prompt.type";
// import { Tone } from "@/models/types/config.types";
import { Tones } from "@/models/types/tone.type";
import { TFunction } from "i18next";
import { CopyToClipboardButton } from "@/common/CopyToClipboardButton";
import styles from "./GeneratedComponentList.module.css";
import { IoMdAddCircleOutline, IoMdInformationCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { GeneratedButton } from "../GeneratedButton";
import { AiOutlineSend } from "react-icons/ai";
import { MutableRefObject } from "react";
import { Noto_Sans_Thai as NotoSansThai } from "next/font/google";
interface GeneratedComponentListProps {
  user?: LoginUser | null;
  prompts: Prompt[];
  tones: Tones[];
  featureName: string;
  generatedMessageCount: number;
  translate: TFunction<"translation", undefined>;
  handleInputTextChange: (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleTypeChange: (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleAddNewRow: () => void;
  handleDeleteRow: (index: number) => void;
  handleGenerateMessage: (index: number) => void;
  textAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
}

const notoSansThai = NotoSansThai({ weight: "400", subsets: ["thai"] });

export const GeneratedComponentList = (props: GeneratedComponentListProps) => {
  const {
    user,
    prompts,
    tones,
    translate,
    featureName,
    generatedMessageCount,
    handleInputTextChange,
    handleTypeChange,
    handleAddNewRow,
    handleDeleteRow,
    handleGenerateMessage,
    textAreaRef,
  } = props;
  return (
    <Container fluid={true} className={styles.page_prompt_area}>
      {user && (
        <div className={`pb-2 d-flex justify-content-end`}>
          <div className={`d-flex ${styles.generate_count_layout}`}>
            <AiOutlineSend className="text-white me-2" size={20} />
            <div className="text-white">
              {generatedMessageCount}&#47;{user?.maxMessages}
            </div>

            <OverlayTrigger
              placement={"top"}
              delay={{ show: 150, hide: 250 }}
              trigger={["hover", "focus"]}
              overlay={
                <Tooltip
                  className={notoSansThai.className}
                  id="generate-count-tooltip"
                >
                  {translate("table.messageInMonth1")} {generatedMessageCount} {translate("from")} {user?.maxMessages}{" "}
                  {translate("table.messageInMonthUnit")}!
                </Tooltip>
              }
            >
              <a href="" onClick={(e) => e.preventDefault()}>
                <IoMdInformationCircle className="text-white ms-2" size={22} />
              </a>
            </OverlayTrigger>
          </div>
        </div>
      )}
      {prompts.map(({ input, tone_id, message, isGenerating }, index) => (
        <Row key={index} className={styles.page_prompt_area_row}>
          <div className="pt-1 pe-1 justify-content-end d-flex">
            {prompts.length > 1 &&
              (isGenerating ? (
                <ImCross
                  className={styles.disable_delete_row_btn}
                  fontSize={20}
                />
              ) : (
                <ImCross
                  className={styles.delete_row_btn}
                  fontSize={20}
                  onClick={() => handleDeleteRow(index)}
                />
              ))}
            {prompts.length <= 1 && <div className="pt-3" />}
          </div>

          <Col xs={12} md={3} className="pb-2">
            <Col className="fs-5 text-light" xs={12} md={12}>
              {translate("table.input.title")}
            </Col>
            <div className="pt-2">
              <textarea
                ref={textAreaRef}
                placeholder={translate(`placeholder.${featureName}`)}
                className={styles.page_prompt_area_textfield}
                value={input}
                onChange={(event) => handleInputTextChange(index, event)}
                style={{ height: "auto" }}
                required
              />
            </div>
          </Col>
          <Col className="pb-2">
            <Col className="fs-5 text-light" xs={12} md={9}>
              {translate("table.type.title")}
            </Col>
            <Col sm className="pt-2">
              <select
                className={styles.page_prompt_area_combobox}
                value={tone_id}
                onChange={(event) => handleTypeChange(index, event)}
                required
              >
                {tones.map((item: Tones) => (
                  <option key={item.id} value={item.id}>
                    {item.tone_name}
                  </option>
                ))}
              </select>
            </Col>
          </Col>

          <Col xs={12} md={3} lg={4} xl={5} className="pb-2">
            <Col className="fs-5 text-light" xs={12} md={6}>
              {translate("table.massage.title")}
            </Col>
            <div className="pt-1">
              {message.length === 0 ? (
                <span className="text-white-50">
                  {translate("table.no_message")}
                </span>
              ) : (
                <Container fluid={true}>
                  <Row>
                    <Col className="d-flex p-0 justify-content-end">
                      <CopyToClipboardButton message={message} />
                    </Col>
                    <Col
                      xs={12}
                      className="text-light p-0 mb-3"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {message}
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          </Col>
          <div className="col p-0">
            <div className="pt-3 d-flex justify-content-center">
              <GeneratedButton
                translate={translate}
                index={index}
                isGenerating={isGenerating}
                handleGenerateMessage={handleGenerateMessage}
              />
            </div>
          </div>
        </Row>
      ))}
      <Container className={styles.page_prompt_area_addrow}>
        <button
          className={styles.page_prompt_add_new_row_button}
          onClick={handleAddNewRow}
        >
          <div className="d-flex pe-0">
            <div className=""> {translate("button.newRow")} </div>
            <div className="ps-2">
              <IoMdAddCircleOutline size={25} />
            </div>
          </div>
        </button>
      </Container>
    </Container>
  );
};
