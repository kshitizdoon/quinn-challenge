import React,{useState} from 'react'
import ReactInfCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import "./Inf.css"
import Render from "./Render.js"
import Tiles from "./Tiles.js"
function InfiniteCalendar(props) {
  const [view, setView] = useState(0);
  const [post, setpost] = useState({});
  const [selected,setSelected] = useState(new Date(2020, 11, 1)); 
  let postarr = props.posts;
  const handleChange=(e)=>{
    let date = JSON.stringify(e);
    date  = date.slice(1,11);
    var d = new Date(date);
    d = d.setTime(d.getTime()+1000*60*60*24); // MILLISECONDS
    setSelected(d);
    postarr?.map((post)=>{
      let date1 = JSON.stringify(post?.calendardatetime).slice(1,11);
      if(date1===date){
          setView(1);
          setpost(post);
      }
    })
  }
  if(view===1){
    return(
      <div>
        <div className = 'calendar'>
        <ReactInfCalendar 
        width = {1250}
        height = {965}
        selected = {selected}
        className = 'calendar'
        minDate = {new Date(1980, 0, 1)}
        rowHeight = {100}
        onSelect = {handleChange}
      />
      </div>
      <div className = "popup">
        <Render setView = {setView} post = {post} />
      </div>
      </div>
    )
  }
  else{
    return (
        <div className='org__calendar'>
          <Tiles
          posts = {props.posts}
        />
        <ReactInfCalendar 
        width = {1250}
        height = {965}
        selected = {selected}
        minDate = {new Date(1980, 0, 1)}
        rowHeight = {100}
        className = 'org__calendar'
        onSelect = {handleChange}
      />
        </div>
    )
  }
}
export default InfiniteCalendar;
