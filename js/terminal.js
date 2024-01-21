
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
    prompt();

    term.onKey((e) => {
        console.log(e.key);
        const printable = !e.altKey && !e.ctrlKey && !e.metaKey;
        if (e.key === '\r'){
            enter();
            return;
        } else if (printable){
            console.log(document.activeElement);
            term.write(e.key);
            current += e.key;
        }
    });
}

// var terminalElement = document.querySelector(".xterm-helper-textarea");
window.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        enter();
    } else if (e.key == "Backspace"){
        // focus(terminalElement);
        if (current){
            current = current.slice(0, current.length-1);
            term.write('\b \b');
        }
    }
});


// terminalElement.addEventListener("keydown", (e) => {
//     if (e.key == "Backspace"){
//         if (current){
//             current = current.slice(0, current.length-1);
//             term.write('\b \b');
//         }
//     }
// })

function enter() {
    execute();
    term.write("\r\n");
    prompt();
}

function prompt() {
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
        displayLog(term);
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