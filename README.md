# This is a Google Play Music Assistant Type Thing
### No name yet 

Forked from Google Play Music Autoplaylists

**This extension is not supported nor endorsed by Google.**

## Installation and support

The rest of this page is intended for developers.

## Development workflow
* run `npm install`
* YOU MUST DO THIS: run `./watch.sh` somewhere and leave it running -- this will build whenever files change
-	- Also, install watchify globallly: `npm -g install watchify`
* go to chrome://extensions/
* click "developer mode"
* click "Load unpacked extension" and provide the repo/src directory
* after updating any javascript, hit "reload" in chrome://extensions/
* you can find the logs in different places depending on the code that's running:
    * content script: music.google.com console
    * background script: click the "background page" link by the "Inspect views" section on chrome://extensions/
    * manager/playlist: on their pages' consoles

---
Google Music is a trademark of Google Inc. Use of this trademark is subject to Google Permissions.
