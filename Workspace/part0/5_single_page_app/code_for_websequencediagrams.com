browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: data.json with content like this:\n[{ content: "foo", date: "2021-05-29" }, ...]

note over browser:
browser executes the event handler that renders
notes to display

the event handler code:
> if (this.readyState == 4 && this.status == 200) {
>   notes = JSON.parse(this.responseText)
>   redrawNotes()
> }
end note

note over browser:
based on the JS code, the browser also registers
an event handler with the "save" button which will
be executed when the button is clicked
end note
