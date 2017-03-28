Simple Node&TypeScript number truncator service
---

Given numbers of different lengths, we want to abbreviate them to comprehensible chunks.

* compile (`tsc`) and run (`npm start`) the server
* open the url of the form `http://localhost:8000/truncate/3141592653.589`
* the abbreviated number should be returned, e.g. `3.1B`

---

For more info check out:
* The server: `src/index.ts`
* The truncation logic: `src/truncator.ts`
* The specifications: `test/truncator.test.ts`