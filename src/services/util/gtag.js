export default function (...params) {
    const { gtag } = window;
    if(gtag) gtag(...params);
    else console.warn('GTag not instaled')
 }