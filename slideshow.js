//get element(s) with slideshow class
const slideshows = document.getElementsByClassName("slideshow");
const imgCount = 2;
let active = 0;

//make a function to refresh the active image
function refreshSlide()
{
    //for each slideshow, go through and find each img tag
    for(let i=0; i<slideshows.length; ++i)
    {
        let images = slideshows[i].children;
        
        for(let j=0; j<images.length; ++j)
        {
            images[j].style.visibility = 'hidden';
            images[j].style.height = 0;
        }
        
        images[active].style.visibility = 'visible';
        images[active].style.height = "300px";
    }
}

setInterval(function(){
    active++;
    //catch it if its too much :)
    if (active >= imgCount)
    {
        active = 0;
    }
    
    refreshSlide();
}, 2500);