note over browser:
Load the page
https://studies.cs.helsinki.fi/exampleapp/notes
as shown in
https://fullstackopen.com/en/part0/fundamentals_of_web_apps#loading-a-page-containing-java-script-review
end note

note over browser:
click "save" button
end note

note over browser:
browser executes POST to /example_app/new_note
according to the attributes "action" and "method"
of the form tag in the HTML code of /exampleapp/notes
end note

note over browser:
the body of the POST request is
note="<note text>"
because in the HTML code the name attribute
of the text input has the value "note"
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

note over server:
code on the server creates a new note object from
the body of the POST request and the current date
end note

note over server:
the new note object is appended to an array of notes
(stored either in the file data.json or just in an in-memory
object based on which a data.json file can be generated.
I'm not sure about the details here)
end note

note over server:
finally, the code on the server issues a
redirect to the browser with the line
"return res.redirect('/notes')"
end note

server->browser: URL redirect via HTTP status code 302 to "/notes"

note over browser:
Load the page
https://studies.cs.helsinki.fi/exampleapp/notes
as shown in
https://fullstackopen.com/en/part0/fundamentals_of_web_apps#loading-a-page-containing-java-script-review

However, this time the data.json file on the server contains the new note which is thus displayed in the browser
end note
