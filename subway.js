//this file takes the URL extension (subway.html#address=...) and fills out information on the page
const testLog = document.getElementById('testLog');
let output = "";

function parseInfo()
{
    let params = new URLSearchParams(location.search);
    let address = params.get('address');

    output = address;
}

parseInfo();
testLog.textContent = output;