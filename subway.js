//this file takes the URL extension (subway.html#address=...) and fills out information on the page

// yelp fusion key
//1q5Wyuia20sg6oTNXdP3N16DVxyXOgjddjzmQURK9Y1KzVBBFK5VvoQ_XAuamKYG1ZTBImLDYQ0rtVsqgeyCivZeEUGgD_1vc1ozyrmFI2wnBNEUzDnDWQKRce5cZHYx

let subways = null;

let endOutput = "";

//get yelp reviews
importSubways();

async function importSubways()
{
    const response = await fetch('../YelpSubway.json');
    const yelp = await response.json()
    subways = yelp.businesses;
    parseInfo();
    
    console.log(endOutput.id); //use in API call
    
    const imgEl = document.getElementById('subwayImg');
    if (endOutput.image_url != "")
    {
        imgEl.src = endOutput.image_url;
    }
}

//import yelp from '../YelpSubway.json' assert { type: 'json' }; //DEPRECATED LMAO

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
    let output = subways[count];
    let tester = output.location.display_address.join(' ');

    while (tester != loc && count < subways.length - 1)
    {
        ++count;
        output = subways[count];
        tester = output.location.display_address.join(' ');
    }

    return output;
}