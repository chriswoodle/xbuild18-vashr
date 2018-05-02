# About

This application sends uploaded images to IBM Watson for processing. 

If an image contains on of the target items, the server will notify the drone-server.

# Setup node
```
npm install
```

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

# Setup python
Login into aws:
```
aws configure
```
Install python deps
```
pip install awscli boto3
```
