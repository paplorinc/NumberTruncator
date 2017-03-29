Simple Node&TypeScript number truncator service
---

Given numbers of different lengths, we want to abbreviate them to comprehensible chunks.

* gather the dependencies — `npm install`
* compile `TypeScript` to `JavaScript` — `tsc`
* fire up the webserver — `npm start`
* open the url of the form `http://localhost:8000/truncate/3141592653.589`
* the abbreviated number should be returned, e.g. `3.1B`
* additionally run the tests via `npm test`

---

For more info check out:
* [The server](/src/index.ts#L14)
* [The truncation logic](/src/truncator.ts#L82)
* [The specifications](/test/truncator.test.ts#L8)