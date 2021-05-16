import React from 'react'
import ReactDOM from 'react-dom'
import "./Tiles.css"

function Tiles(props){
    let postarr = props.posts;
    var x = document.getElementsByTagName('li');
    var i;
    for(i=0;i<x.length-1;i++){
        let y = x[i].getAttribute("class");
        if(y === 'Cal__Weekdays__day'){
            continue;
        } 
        var date = x[i].getAttribute("data-date");
        postarr.map((post)=>{
            let datetime =  post?.calendardatetime;
            let date1 = JSON.stringify(datetime).slice(1,11);
            if(date1===date){
                var d = new Date(datetime);
                d = d.setTime(d.getTime() + 1000 * 60 * 60 * 24); // MILLISECONDS
                d = JSON.stringify(new Date(d)).slice(6,11);
                //Remove "" from image URL
                var text = post.media[0]?.mediaurl.replace("\"", "");
                var string = "url(" + text + ")";

                x[i+1].style.background = string;
                x[i+1].style.backgroundPosition = "center";
                x[i+1].style.backgroundRepeat= "no-repeat";
                x[i+1].style.backgroundSize = "40% 50%";
                x[i+1].style.backgroundColor = "pink";
                x[i+1].style.borderStyle= "solid";
                // x[i+1].style.backgroundOpacity = "0.6";
                // Adding Rating
                var day = date.slice(8,10);
                console.log(day);
                if(d.slice(3,5) !== "01")d = d.slice(3,5);
                var rating="";
                var j;
                for(j=0;j<post?.rating;j++)rating+="⭐";
                //Adding type of Day
                const arr = post?.typeofday;
                var typeofday="";
                arr.map((text)=>{
                    if(text ==="protein treatment")typeofday+='PC ';
                    else if(text ==="hair cut")typeofday+='Cu ';
                    else if(text ==="hair color")typeofday+='HC ';
                    else if(text ==="deep conditioning")typeofday+='DC ';
                    else if(text ==="clarifying")typeofday+='C ';
                })
                ReactDOM.render(
                    <div className= "__body">
                        <p className="__rating">{rating}</p>
                        <p className="__date">{d}</p>
                        <p className="__typeofday">{typeofday}</p>
                    </div>
                    , x[i+1]
                );
            }
        })
    }
    return (
        <div>
           
        </div>
    )
}

export default Tiles
