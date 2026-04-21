'use strict';
function acceptCookies() {    localStorage.setItem('cookieConsent',
'accepted');    document.getElementById('cookie-banner').style.display =
'none';}
function declineCookies() {    localStorage.setItem('cookieConsent',
'declined');    document.getElementById('cookie-banner').style.display =
'none';}
window.addEventListener('DOMContentLoaded', function () {    var consent =
localStorage.getItem('cookieConsent');    if (!consent) {
document.getElementById('cookie-banner').style.display = 'flex';    }});
