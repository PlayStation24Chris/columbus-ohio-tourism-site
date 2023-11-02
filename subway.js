//this file takes the URL extension (subway.html#address=...) and fills out information on the page

// yelp fusion key
//OLD -- 1q5Wyuia20sg6oTNXdP3N16DVxyXOgjddjzmQURK9Y1KzVBBFK5VvoQ_XAuamKYG1ZTBImLDYQ0rtVsqgeyCivZeEUGgD_1vc1ozyrmFI2wnBNEUzDnDWQKRce5cZHYx

//CLIENT ID -- -l2Fu-R93GSQdiZ-jN3L8A
//NEW -- WP_22ljbVGJtFYEjWPo6it1zWEtSUzW5wSisruPs_a7CInxpH7yJm6IFcckXwhQZlU1wWBCwi8-dWnK84Ohk8KiH3tGQHhPtOG8lob8vve8Mg9xgWDRS_DDZ_slDZXYx

const options = {
    method: 'GET',
    headers: {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer WP_22ljbVGJtFYEjWPo6it1zWEtSUzW5wSisruPs_a7CInxpH7yJm6IFcckXwhQZlU1wWBCwi8-dWnK84Ohk8KiH3tGQHhPtOG8lob8vve8Mg9xgWDRS_DDZ_slDZXYx"
    }
};

let subways = null;
let reviewData = null;
let endOutput = "";

//get yelp reviews
importSubways();

async function importSubways()
{
    let rspns = await fetch('../YelpSubway.json');
    const yelp = await rspns.json();
    subways = yelp.businesses;
    parseInfo();
    
    const imgEl = document.getElementById('subwayImg');
    if (endOutput.image_url != "")
    {
        imgEl.src = endOutput.image_url;
    }

    console.log(endOutput.id); //use in API call

    fetch('../YelpReviews.json').then(async (res) => {
        if (res.ok) {
            //console.log(await res.json().businesses[endOutput.id]);
            reviewData = await res.json();
            if (endOutput.id in reviewData.businesses) {
                reviewData = reviewData.businesses[endOutput.id];
                fillReviews(reviewData);
            } else { //currently not working VVVV (but would be fixed by default if all locations were added to JSON file)
                console.log("no data found. Requesting data...");
                fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+endOutput.id+"/reviews?limit=2&sort_by=yelp_sort", options).then(response => response.json()).then(response => fillReviews(response));
            }
        }
        else
        {
            console.log("no data found. Requesting data...");
            fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+endOutput.id+"/reviews?limit=2&sort_by=yelp_sort", options).then(response => response.json()).then(response => fillReviews(response));
        }
    });


    /*$.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+endOutput.id+"/reviews",
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-requested-with': 'xmlhttprequest',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer 1q5Wyuia20sg6oTNXdP3N16DVxyXOgjddjzmQURK9Y1KzVBBFK5VvoQ_XAuamKYG1ZTBImLDYQ0rtVsqgeyCivZeEUGgD_1vc1ozyrmFI2wnBNEUzDnDWQKRce5cZHYx'
        },
        success: fillReviews(result)
    });*/
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

function fillReviews(data)
{
    console.log(data);
    
    let rImg = null;
    let rTxt = null;
    let rNam = null;
    let rLnk = null;

    for (let j=0; j<data.reviews.length; ++j)
    {
        rImg = document.getElementById('rImg'+j);
        rTxt = document.getElementById('rText'+j);
        rNam = document.getElementById('rName'+j);
        rLnk = document.getElementById('rLink'+j);
        
        if (data.reviews[j].user.image_url != null)
        {
            rImg.src = data.reviews[j].user.image_url;
        }
        else
        {
            rImg.src = 'Resources/Images/Bat Walter White.jpg';
        }

        rTxt.textContent = data.reviews[j].text;
        rNam.textContent = data.reviews[j].user.name;
        rLnk.href = data.reviews[j].url;
    }

    if (data.reviews.length < 2)
    {
        let reviewPanels = document.getElementsByClassName('review');
        reviewPanels[data.reviews.length].style.visibility = 'hidden';
    }
}