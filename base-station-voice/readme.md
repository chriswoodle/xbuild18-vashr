# About

This application handles communication to IBM Watson speech apis.

When a phonecall is recorded on Twillio, the download link to the recording is sent to this server as a webhook. Once the recording is downloaded, it is uploaded to IBM Waston to be transcribed. If the speech transcription contains a keyword, a HTTP request is made to the drone server.

This server also has a generic Text-to-Speech endpoint that outputs to a conencted speaker.

# Setup
```
npm install
```
Create `keys.json` from `keys.master.json` and add api keys from IBM watson.

# Running
```
node index
```
# Debugging
Normal debug:
```
export DEBUG=xbuild:*
node index
```

Verbose debug:
```
export DEBUG=xbuild*
node index
```