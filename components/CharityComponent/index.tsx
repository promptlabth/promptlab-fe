// import { useEffect } from 'react';

// const ClarityAnalytics = () => {
//     useEffect(() => {
//         (function(c: Window, l: Document, a: string, r: string, i: string) {
//             c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
//             let t = l.createElement(r);
//             t.async = 1;
//             t.src = "https://www.clarity.ms/tag/" + i;
//             let y = l.getElementsByTagName(r)[0];
//             y.parentNode.insertBefore(t, y);
//         })(window, document, "clarity", "script", "lxsllpw7xs");
//     }, []);

//     return null;  // This component does not render anything
// };

// export default ClarityAnalytics;

import { useEffect } from 'react';

// Extend the Window interface to include a dynamic property index signature
declare global {
    interface Window {
        [key: string]: any;
    }
}

const ClarityAnalytics = () => {
    useEffect(() => {
        (function(c: Window, l: Document, a: string, r: string, i: string) {
            c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
            let t = l.createElement(r) as HTMLScriptElement;
            t.async = true;
            t.src = "https://www.clarity.ms/tag/" + i;
            let y = l.getElementsByTagName(r)[0];
            if (y.parentNode) {
                y.parentNode.insertBefore(t, y);
            }
        })(window, document, "clarity", "script", "lxsllpw7xs");
    }, []);

    return null;
};

export default ClarityAnalytics;


