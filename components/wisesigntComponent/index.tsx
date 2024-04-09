import { useText } from "@/contexts/WiseSightContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { Container } from "react-bootstrap";
import styles from "./styles.module.css";

export const Wisesight = () => {

  const wisesightPath = process.env.NEXT_PUBLIC_WISESIGHT_PATH;

  const router = useRouter(); // Use the router

  const { setText } = useText();

  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    // Define the function to handle incoming messages
    const handleMessage = (e: MessageEvent) => {
      if (e.data.text) {
        setText(e.data.text);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('message', handleMessage, false);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  useEffect(() => {
    const updateMedia = () => {
      setIsMedium(window.innerWidth >= 768); // Bootstrap's medium breakpoint
    };

    window.addEventListener('resize', updateMedia);
    updateMedia(); // Initial check

    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const shouldRender = router.pathname !== '/';



  return shouldRender ? (
    <Container fluid={true} className="p-0 bg-dark pt-1 pb-5">
      <Container className={`bg-dark ${styles.container}`}>
          <div>
            <div style={{ background: '#212529' }}>
                <iframe
                  src={wisesightPath}
                  width="100%"
                  height="600"
                  style={{ border: '0', background: '#212529' }}
                  title="Wissight x promptlab"
                />
            </div>
          </div>
      </Container>
    </Container>
  ) : null;
}