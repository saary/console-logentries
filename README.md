# console-logentries
Direct console log to logentries

```javascript
const logEntriesConsole = require('console-logentries');

// should be in the entry point of the applications
logEntriesConsole.register({ token: 'XXX', print: true });
```

## Options
- `token`: required; logentries destination token uuid
- `secure`: optional; default is false; use tls for communication
- `transport`: optional; default is LogEntriesTransport; transport object
- `levels`: optional; default is syslog-style; custom log levels
- `printerror`: optional; default is true; print errors to STDERR with console.error
- `timestamp`: optional; default is true; autogenerate a timestamp
- `usequotes`: optional; default is false; add double quotes around every field
- `print`: optional; default is false; print everything to console
