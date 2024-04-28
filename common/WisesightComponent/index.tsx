import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";

interface WisesightComponentProps {
  handleCopyTextFromWiseSight: (text: string) => void;
}

export const Wisesight = (props: WisesightComponentProps) => {
  const { handleCopyTextFromWiseSight } = props;
  const wisesightPath = process.env.NEXT_PUBLIC_WISESIGHT_PATH;
  const router = useRouter(); 

  useEffect(() => {
    // Define the function to handle incoming messages
    const handleMessage = (event: MessageEvent) => {
      if (event.data.text) {
        handleCopyTextFromWiseSight(event.data.text)
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("message", handleMessage, false);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, []);

  const shouldRender = router.pathname !== "/";

  return shouldRender ? (
    <Container fluid={true} className="p-0 bg-dark pt-1 pb-5">
      <Container className={`bg-dark`}>
        <div>
          <div style={{ background: "#212529" }}>
            <iframe
              src={wisesightPath}
              width="100%"
              height="600"
              style={{ border: "0", background: "#212529" }}
              title="Wissight x promptlab"
            />
          </div>
        </div>
      </Container>
    </Container>
  ) : null;
};
