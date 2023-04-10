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
                    {/* <title>Prompt Lab: AI-Powered Content Generator for Social Media & More</title> */}
                    <meta
                        name="description"
                        content="Prompt Lab is an AI-powered content generation tool that helps you create engaging social media posts, emails, and more in English and Thai. Boost your content creation with Prompt Lab today! - เป็นเครื่องมือสร้างเนื้อหาที่ขับเคลื่อนด้วย AI ซึ่งช่วยคุณสร้างโพสต์สื่อสังคม, อีเมล, และอื่น ๆ ที่น่าสนใจในภาษาอังกฤษและภาษาไทย ปรับปรุงการสร้างเนื้อหาของคุณด้วย Prompt Lab ในวันนี้!"
                    />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
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