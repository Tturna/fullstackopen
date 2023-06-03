```mermaid
sequenceDiagram
    participant browser
    participant server

    note right of browser: The client renders the new note list and sends the new data to the server.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server
```