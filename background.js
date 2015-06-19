var events = [];

chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        var referrer;
        if (details.url.split('.com')[0].split('//')[1] == 'api.mixpanel') { // change this if the Mixpanel API URL ever changes
            for (i = 0; i < details.requestHeaders.length; i++) {
                if (details.requestHeaders[i].name === 'Referer') {
                  referrer = details.requestHeaders[i].value;
                  break;
                }
            }
            data = JSON.parse(atob(decodeURIComponent(details.url.split('data=')[1].split('&')[0])));
            if (data.hasOwnProperty('event') && data.hasOwnProperty('properties')) {
                events.push([referrer, data]);
            }   
        }
    },
    {urls: ['http://*/*', 'https://*/*']},
    ['requestHeaders']
);