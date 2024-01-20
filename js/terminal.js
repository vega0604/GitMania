
var term = new Terminal({
    cursorBlink: true
});
term.open(document.getElementById('terminal'));

let current = "";
let firstName = "Sebastian";
let lastName = "Vega";

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;
    
    term.write("\n");
    prompt(term);

    term.onKey((e) => {
        if (e.key == "\r"){
            enter();
            return;
        }
        term.write(e.key);
        current += e.key;
    });
}

window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        enter();
    }
});

function enter() {
    execute();
    term.write("\n");
    prompt(term);
}

function prompt(term) {
    term.write(`\r${lastName.toLowerCase()}@${firstName.toLowerCase()}:~$ `);
}

function execute(){
    console.log(current);
    if (current == "clear" || current == "cls"){
        term.reset();
    }

    current = "";
}

init();