
function saveToBuffer(sprite){
    console.log("Saving to buffer: " + sprite);
    var buffer = {
        x: sprite.x,
        y: sprite.y,
    }
    document.cookie = "buffer=" + JSON.stringify(buffer);
    
}

function loadFromBuffer(){
    var buffer = JSON.parse(getCookie("buffer"));
    return buffer;
}

let history = {};
let addr = 0;
function saveToHistory(msg){
    console.log("Saving to history: " + msg);
    if (msg in history){
        console.log("DuplicateKeyError: " + msg);
        return;
    }
    var historyItem = {
        pos: loadFromBuffer(),
        msg: msg
    }
    history[addr] = historyItem;

    document.cookie = "history=" + JSON.stringify(history);
    addr += 1;
}

function loadHistory(){
    console.log("Loading from history");
    var history = JSON.parse(getCookie("history"));

    return history;
}

function applyCheckout(history, addr){
    console.log("applying checkout: " + addr);
    var item = history[addr];
    console.log(history);
    console.log(addr);
    console.log(item);
    sprite.x = item.pos.x;
    sprite.y = item.pos.y;

}

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

function clearCookies(){
    document.cookie = "buffer={}";
    document.cookie = "history={}";
}