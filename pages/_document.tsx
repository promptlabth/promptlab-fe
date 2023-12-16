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
                    <meta name="description" content="Prompt Lab: AI-Powered Content Generator for Social Media & More" />
                    {/* image */}
                    <meta property="og:image" content="https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/365389074_188343804240037_4562066473151931163_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeHybvSSIsYwCb_gVI4qDA0-YtUcsGg5U-di1RywaDlT50NxcJ4-HWxUuzYLcTXCI2ZWLKP-kq5RqpUs5O2MEH_K&_nc_ohc=p9nuLK9RtBoAX-je2rm&_nc_ht=scontent.fnak3-1.fna&oh=00_AfDj6y_UrL8FpyKelF9I9Lo7IrNsJmeZcGaa45ut1xvY6g&oe=6581637E" />
                    
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