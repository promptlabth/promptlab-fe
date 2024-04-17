// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="th">
                <Head>

                    <meta property="og:url" content="https://promptlabai.com/" key="ogurl" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Prompt Lab AI" key="ogtitle" />
                    <meta property="og:image" content="/images/prompt_lab_logo.png" key="ogimage"/>
                    <meta property="og:description" content="Prompt Lab is an AI-powered content generation tool that helps you create engaging social media posts, emails, and more in English and Thai. Boost your content creation with Prompt Lab today! - เป็นเครื่องมือสร้างเนื้อหาที่ขับเคลื่อนด้วย AI ซึ่งช่วยคุณสร้างโพสต์สื่อสังคม, อีเมล, และอื่น ๆ ที่น่าสนใจในภาษาอังกฤษและภาษาไทย ปรับปรุงการสร้างเนื้อหาของคุณด้วย Prompt Lab ในวันนี้!" key="ogdesc" />
                    {/* <meta property="og:image" content="https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/365389074_188343804240037_4562066473151931163_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHybvSSIsYwCb_gVI4qDA0-YtUcsGg5U-di1RywaDlT50NxcJ4-HWxUuzYLcTXCI2ZWLKP-kq5RqpUs5O2MEH_K&_nc_ohc=p9nuLK9RtBoAX-je2rm&_nc_ht=scontent.fnak3-1.fna&oh=00_AfDj6y_UrL8FpyKelF9I9Lo7IrNsJmeZcGaa45ut1xvY6g&oe=6581637E" /> */}

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="promptlabai.com" />
                    <meta property="twitter:url" content="https://promptlabai.com/" />
                    <meta property="twitter:image" content="/images/prompt_lab_logo.png" />
                    <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "lxsllpw7xs");
              `,
            }}
          />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;