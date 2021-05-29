note over browser
user clicks "save" button
end note

note over browser
event handler previously assigned to
form.onsubmit is executed:

1. JS code e.preventDefault() prevents the
default handling of the button click
2. new note is added to node array
3. content of text box is deleted
4. notes are redrawn with the new note added
by the user but notes added by other users
in the meantime are not drawn because the
up-to-date notes data is not fetched from the
server
5. new note is sent to server
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa\nContent-type: application/json\ncontent: content and creation date of new note in JSON format

note over server:
stores new note

responds with status code 201
end note
