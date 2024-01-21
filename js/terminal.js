
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
    clearCookies();


    term._initialized = true;
    
    term.write("\n");
    prompt(term);

    term.onKey((e) => {
        if (e.key == "\r"){
            enter();
            return;
        }
        if (e.key == "Backspace"){
            backspace();
            current = current.slice(0, current.length-1);
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

function backspace(){
    term.clear();
    term.write(current);
}

function prompt(term) {
    term.write(`\r${lastName.toLowerCase()}@${firstName.toLowerCase()}:~$ `);
}

function execute(){
    console.log(current);

    var currentCopy = current;
    current = "";
    if (currentCopy == "clear" || currentCopy == "cls"){
        term.reset();
        return;
    }

    if (currentCopy == "git add ."){
        saveToBuffer(sprite);
        return;
    }

    var commitString = "git commit -m ";
    if (currentCopy.length >= commitString.length + 3 && 
        currentCopy.slice(0, commitString.length) == commitString){
        saveToHistory(getTextParam(currentCopy));
        return;
    }

    var checkoutString = "git checkout ";
    if (currentCopy.length >= checkoutString.length + 1 &&
        currentCopy.slice(0, checkoutString.length) == checkoutString){
        var history = loadHistory();
        applyCheckout(history, currentCopy.slice(checkoutString.length))
        return;
    }

    if (currentCopy == "git log"){

    }
}

function getTextParam(msg){
    var commitMsg = "";

    for (let i=msg.indexOf("\"")+1;i < msg.length;i++){
        if (msg.charAt(i) == "\""){
            break;
        }
        commitMsg += msg.charAt(i);
    }

    return commitMsg;
}

init();