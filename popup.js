function updateList() {
    var background_events = chrome.extension.getBackgroundPage().events;
    new_html = '<div style="text-align: center">New events are added at the bottom</div><br><table class="pure-table pure-table-striped"><thead><tr><th class="url">URL</th><th class="event">Event</th><th class="properties">Properties</th></tr></thead><tbody id="event-list">';
    if (background_events.length) {
        for (i = 0; i < background_events.length; i++) {
            url = background_events[i][0];
            event_name = background_events[i][1]['event'];
            event_properties = JSON.stringify(background_events[i][1]['properties'], null, ' ');
            new_html += '<tr><td class="url">' + url + '</td><td class="event">' + event_name + '</td><td class="properties"><pre>' + event_properties.slice(1,-1).replace(/"/g, '') + '</pre></td></tr>';
        }
        new_html += '</tbody></table><br><div style="text-align: center"><button class="pure-button pure-button-primary" id="clear">Clear all</button></div>';
        document.getElementById('container').innerHTML = new_html;
        document.getElementById('clear').onclick = function() {
            chrome.extension.getBackgroundPage().events = [];
            document.getElementById('container').innerHTML = '<br><div style="text-align: center">No events triggered yet</div><br>';
            window.close();
        };
    }
}

window.onload = function() {
    updateList();
    setInterval(updateList, 3000);
};