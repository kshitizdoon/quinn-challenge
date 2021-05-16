import React from 'react'
import './Render.css'
function renderSwitch(day){
    switch(day) {
        case 'hair cut':
          return <div className='cu'>Cu</div>;
        case 'protein treatment':
            return <div className='pr'>Pr</div>;
        case 'hair color':
            return <div className='hc'>HC</div>;
        case 'deep conditioning':
            return <div className='dc'>DC</div>;
        case 'clarifying':
            return <div className='c'>C</div>;
        default :
            return 'E';
    }
}
const Button = props => {
    const { clickEvent } = props;
    return <button className='button' onClick={clickEvent}>Go Back</button>
}
function Render({post,setView}) {
    const {
        id : id,
        calendardatetime : datetime ,
        media : media, 
        rating: rating,
        text : text,
        typeofday: typeofday, 
    } = post;
    var d = new Date(datetime);
    d = d.setTime(d.getTime() + 1000 * 60 * 60 * 24); // MILLISECONDS
    d = new Date(d)
    return (
        <div className="display">
            <img className = "Image" src= {media[0]?.mediaurl} alt = "Koi baat nahi"/>
            <div class="typeofday">{
                typeofday.map((day)=>{
                    return(
                        <div className= "day">
                            {renderSwitch(day)}
                        </div>
                    )
                })
            }
            </div>
            <div className = "Ratings">
                {Array(rating).fill().map((_)=>(<p className='Rating'>⭐</p>))}
            </div>
            <div className = "date">
            {
                JSON.stringify(d).slice(1,11)
            }</div>
            <div class="text">{text}</div>
            <Button className = 'button' clickEvent={setView}/>
        </div>
    )
}
export default Render;