# Typed Express IO
A lightweight microservice framework using typscript, express and socketio with npm as the build tool.

The reasoning behind using npm as the build tool instead of grunt or gulp is to minimize the tools required for the build pipeline. Grunt and gulp are built on the idea of plugins. Using npm instead of going through external plugins pipepline allows for better customization of build processes. Build steps can simply be written in javascript and called from npm directly. This is very helpful for users familiar with unix, who want to call shell scripts in standard ways.

To build from scratch, run ```npm run-script cleanInstall```.

Run ```npm start``` and a minimal application will be started that serves a demo html file that is web socket enabled.

The web socket will emit an event that can be seen in your node process window. 

If you open your browsers web console, you will see a hello world response sent from the demo route logged.
