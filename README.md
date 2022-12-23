# NLP Manager

Web/Desktop tool for managing and testing bots based on nlp.js

## Goals

 - [ ] Edit corpus files
 - [ ] Edit pipeline files
 - [ ] Edit dialog files
 - [ ] Test bot
 - [ ] Train bot

## Development

### Raw UI

It won't have any API available.

```
npx yarn dev:ui
```

### Electron

```
npx yarn dev:electron
```

### Web

```
TODO
```

## Structure

### @nlp-manager/shared

 * Contains shared types
 * Contains shared enums
 * Contains shared routines
 * Exposes interface for window.nlpManagerBackend

### @nlp-manager/ui

 * CRACO app
 * Contains interface which has no knowledge of backend 

### @nlp-manager/electron

 * ElectronForge app
 * Exposes window.nlpManagerBackend as IPC contextBridge

### @nlp-manager/api

 * TODO
 * Contains implementation of window.nlpManagerBackend as REST API

## @nlp-manager/web-backend

 * TODO
 * Simple using memory storage - meant to be used when app runs as static SPA

## @nlp-manager/backend

 * TODO
 * Unlicensed - this part of the repository is meant to remain proprietary solution. Contact the author for details.

## License

DUAL LICENSE:

 * MIT license below for the content of this repository.
 * Separate license for @nlp-manager/backend package.

MIT License

Copyright (c) 2022 Łukasz Marek Sielski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
