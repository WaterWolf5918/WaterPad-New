# How To Handle Protocols
A guide on how diffrent sockets work in waterpad



## front end socket events
| Value  | front end type | Use/Type |
| ------ | -------------- | ---------- |
| `Button click` | Web Client |`The button thats click `Any|
| `ServerInfo` | Desktop Manager | `To get server info and debug info` String |
| `message` | Any | `sends msg from frontend to backend mainly for debugging` String |
| `connected` | Any | `sent when frontend connects to websocket sent with [Name]` String |





## socket event {titlebar}
| Value  | Use/Type     |
| ------ | ---------- |
| `min` |`titlebar action`String|
| `max` |`titlebar action`String|
| `exit` |`titlebar action`String|



