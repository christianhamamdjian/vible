// export const isSafari = navigator.vendor.match(/apple/i) &&
//     !navigator.userAgent.match(/crios/i) &&
//     !navigator.userAgent.match(/fxios/i) &&
//     !navigator.userAgent.match(/Opera|OPT\//)

export const isSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    (typeof window.safari !== 'undefined' && window.safari.pushNotification) ||
    (navigator.vendor &&
        navigator.vendor.indexOf('Apple') > -1 &&
        navigator.userAgent &&
        navigator.userAgent.indexOf('CriOS') === -1);