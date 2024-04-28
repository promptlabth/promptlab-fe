import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsFillClipboardCheckFill, BsFillClipboardFill } from "react-icons/bs";

export const CopyToClipboardButton = ({ message }: { message: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {isCopied ? <span className="fs-6"> Copied </span> : <span className="fs-6"> Copy to Clipboard </span>}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 50, hide: 50 }}
      overlay={renderTooltip}
    >
      <CopyToClipboard text={message} onCopy={() => { setIsCopied(true) }}>
        {!isCopied ?
          <button type="button" className="btn btn-secondary btn-sm">
            <BsFillClipboardFill />
          </button> :
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ background: "#16942C" }}
            onMouseLeave={() => {
              setTimeout(() => {
                setIsCopied(false);
              }, 1000);
            }}>
            <BsFillClipboardCheckFill />
          </button>
        }
      </CopyToClipboard>
    </OverlayTrigger>
  );
}
