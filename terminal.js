
var term = new Terminal();
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
term.open(document.getElementById('terminal'));