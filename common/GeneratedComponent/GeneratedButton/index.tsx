import { AiOutlineSend } from "react-icons/ai"
import styles from "./GeneratedButton.module.css"
import { TFunction } from "i18next"
interface GeneratedButtonProps {
  index: number
  isGenerating: boolean
  translate: TFunction<"translation", undefined>,
  handleGenerateMessage: (index: number) => void
}


export const GeneratedButton = (props: GeneratedButtonProps) => {
  const { index, isGenerating, translate, handleGenerateMessage } = props
  return (
    <>
      {isGenerating ?
        <button
          className={styles.page_prompt_loading_generate_btn}
          type="button"
          disabled={true}
          style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
        >
          <div className="d-flex">
            <div className="pe-2 ps-2">
              <div className="spinner-border spinner-border-sm"></div>
            </div>
            <div className="pe-2"> Generating </div>
          </div>
        </button>
        :
        <button
          // data-bs-toggle={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "modal" : ""}`}
          // data-bs-target={`${userContext?.user == null || userContext.remainingMessage <= 0 ? "#Modal" : ""}`}
          className={styles.page_prompt_generate_btn}
          type="button"
          onClick={()=>{handleGenerateMessage(index)}}
          style={{ padding: 3, paddingBottom: 8, paddingTop: 8 }}
        >
          <div className="d-flex pe-2 ps-2">
            <div className="pe-2">
              <AiOutlineSend size={20} />
            </div>
            <div className=""> {translate("button.genarate")} </div>
          </div>
        </button>
      }
    </>
  )
}