export const isSafari =
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
    (navigator.vendor && navigator.vendor.indexOf('Apple') > -1) ||
    (window.CSS && CSS.supports && CSS.supports('-webkit-overflow-scrolling: touch'));