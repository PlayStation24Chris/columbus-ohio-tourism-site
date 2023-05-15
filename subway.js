//this file takes the URL extension (subway.html#address=...) and fills out information on the page
//get yelp reviews
import yelp from '../YelpSubway.json' assert { type: 'json' };
const subways = yelp.businesses;

const testLog = document.getElementById('testLog');
let endOutput = "";

function parseInfo()
{
    let params = new URLSearchParams(location.search);
    let address = params.get('address');
    address = address.split('_');
    address[address.length - 3] += ',';
    address = address.join(' ');


    endOutput = sortSubways(address);
}

function sortSubways(loc)
{
    let count = 0;
    let output = yelp.businesses[count];
    let tester = output.location.display_address.join(' ');

    while (tester != loc && count < subways.length - 1)
    {
        ++count;
        output = yelp.businesses[count];
        tester = output.location.display_address.join(' ');
    }

    return output;
}

parseInfo();
console.log(endOutput.id); //use in API call

const imgEl = document.getElementById('subwayImg');
if (endOutput.image_url != "")
{
    imgEl.src = endOutput.image_url;
}