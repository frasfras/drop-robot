// import './index.css';
// import './dashboard.css';
import axios from 'axios';
import React,{useEffect, useState} from 'react';

// import {Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom'
// import BadgeList from './BadgeList';

// import BarChart from 'react-bar-chart';
import './style.css';
// import Documents from './Documents';


export default function Resume({ fileContent ,props}) {
//     const [search,setSearch]=useState('a');
  
   const [text,setText]=useState('');
   const [theResume,settheResume]= useState(false);
    const [topics,setTopics]=useState([]);
    const [main,setMain]=useState([]);
    const [entities,setEntities]=useState([]);
    

    const [data,setData] =useState ([
        {text: 'Positive', value: 500}, 
        {text: 'Negative', value: 300},
        {text: 'Overall', value: 300} 
      ]);

      const margin = {top: 20, right: 20, bottom: 30, left: 40};

//   useEffect(() => {
//       // temporary holder api for http://localhost:1880/monitors 
//     fetch(`https://mocki.io/v1/b030311b-6c6f-4018-9902-9219bb8582ee?_limit=8`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(
//             `This is an HTTP error: The status is ${response.status}`
//           );
//         }
//         return response.json();
//       })
//       .then((actualData) => {
//         setData(actualData);
//         setError(null);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setData(null);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);
useEffect(()=>{
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === undefined){
        props.history.push('/exam')
    }

    // document.getElementById('body').style.backgroundColor='white';
},[])

  const token = localStorage.getItem('token');
    
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     } 
    };  
     
    const appURL='https://nlapi.expert.ai/v2/analyze/standard/en/relevants'

// const config = {
//     headers: { 'Authorization': `Bearer ${process.env.REACT_APP_EXPERT_AI_TOKEN}`,
//     'Content-type':'application/json'
//  }
// };
const [badges, setBadges] = useState([]);
  const [newBadge, setNewBadge] = useState('');

  const handleBadgeClick = (badge) => {
    // Add the clicked badge to the array
    setBadges([...badges, badge]);
  };

const onClick=(e)=>{
   //  console.log(e.lemma);
    
}

const onChange=(e)=>{
    setText(e.target.value);
}
const refreshPage=(e)=> {
    window.location.reload(false);
  }

  const submit=(e)=>{
    e.preventDefault();
    console.log(token);
    axios.post(appURL,{
        document:{
            text:text
        }
    },config).then((res)=>{
    console.log(process.env.REACT_APP_EXPERT_AI_TOKEN);
        console.log(res.data)
        
        setTopics(res.data.data.topics)
        setMain(res.data.data.mainSentences)
        
    }).catch(err=>{
        console.log(err);

    })
    
    axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/entities',{
        document:{
            text:text
        }
    },config).then((res)=>{
        console.log(res.data)
        setEntities(res.data.data.entities)
    }).catch((err)=>{
        console.log(err);
    })
    
    axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/sentiment',{
        document:{
            text:text
        }
    },config).then((res)=>{

        const datavalues=[...data];
        var item=datavalues[0];
        item.value=res.data.data.sentiment.positivity;
        datavalues[0]=item;

        item=datavalues[1];
        item.value=Math.abs(res.data.data.sentiment.negativity);
        datavalues[1]=item;

        item=datavalues[2];
        item.value=res.data.data.sentiment.overall;
        datavalues[2]=item;

        
       setData(datavalues);

        console.log(data);

        
    }).catch((err)=>{
        console.log(err);
    })
    
     settheResume(true);

}
  return theResume?(
    <div>
        {/* {Routes} */}
        <div className="container">
       
        <label for="exampleFormControlTextarea1" style={{marginTop:'3rem'}}>Enter Review Text</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="12" value={text}></textarea>
        <button onClick={refreshPage}> Try another!</button>
        <div style={{marginTop:'2rem'}}class="form-group">
      
    
      </div>
      <div class="container">
        <div class="row">
            <div class="col-sm">
            {/* One of three columns */}
            <div class="card" style={{marginTop:'2rem'}} >
            
                <div class="card-body">
                <h5 class="card-title">Summary</h5>
                {
                    main.map((maintext)=>{
                        return(
                            <p className="text-justify" >{maintext.value}</p>
                        )
                    })
                }
                    
                
                </div>
            </div>
            </div>
            <div class="col-sm">
            

            </div>
            <div class="col-sm">
            <ul class="list-group" style={{marginTop:'2rem'}}>
            <li class="list-group-item"><b> Entities mentioned</b></li>
            {
                entities.map((entity,index)=>{
                    return(
                        // <li class="badge badge-info">{entity.lemma}</li>
                        <span
                        key={index}
                        className="badge badge-primary m-2"
                        onClick={() => handleBadgeClick(entity.lemma)}
                        style={{ cursor: 'pointer' }}
                      >
                        {entity.lemma}
                      </span>
                    )
                })
            }
            
            
        </ul>
            </div>
        </div>
        </div>
        <h4>Phrases</h4>
        <div className="row">
        {
                topics.map((topic)=>{
                    return(
                        <h5><span class="badge rounded-pill badge-secondary">{topic.label}</span></h5>
                    )
                })
            }
            </div>
        <div className="row">
            <div className="col col-lg-4" style={{marginTop:'2rem'}}>
            {/* {
                topics.map((topic)=>{
                    return(
                        <h5><span style={{marginRight:'10px'}} class="badge badge-warning">{topic.label}</span></h5>
                    )
                })
            } */}
            </div>
            <div className="col col-lg-8">
            <ul class="list-group" style={{marginTop:'2rem'}}>
            <li class="list-group-item"><b>Main Entities mentioned</b></li>
            {
                entities.map((entity)=>{
                    return(
                        <li class="list-group-item" >{entity.lemma}</li>
                    )
                })
            }
            
            
        </ul>
                
            </div>
        </div>

        <div class="card" style={{marginTop:'2rem'}} >
            
                <div class="card-body">
                <h5 class="card-title">Summary</h5>
                {
                    main.map((maintext)=>{
                        return(
                            <p className="text-justify">{maintext.value}</p>
                        )
                    })
                }
                    
                
                </div>
            </div>

        
      
                
        </div>
        {/* <h5 style={{textAlign:'center',marginTop:'2rem'}}>Sentiment</h5> */}
        {/* <div style={{width: '100%'}}> 
             <BarChart ylabel='Scale'
              width={500}
              height={500}
              margin={margin}
              data={data}
              /> 
        </div> */}
            
       {/* <BadgeList /> */}
       <h2>Search List</h2>
       {
                badges.map((badge,index)=>{
                    return(
                        // <li class="badge badge-info">{entity.lemma}</li>
                        <span
                        key={index}
                        className="badge badge-primary m-2"
                        
                      >
                        {badge}
                      </span>
                    )
                })
            }
            {/* <Documents /> */}
    </div>

):(
    <div>
    {/* {Routes} */}
       <p>{fileContent}</p>
        <div className="container">
            <form class="form-group" style={{marginTop:'3rem'}} onSubmit={submit}>
            <label htmlFor="dbxFormControlTextarea1" style={{marginTop:'3rem'}}><h4>Enter Resume Text</h4></label>
                
            <textarea className="form-control" id="dbxFormControlTextarea1" value={fileContent} onChange={onChange} cols="40" rows="12" ></textarea>
            <button style={{marginTop:'20px'}} type="submit" className="btn btn-block btn-success">Submit Resume</button>
            
            </form>
        </div>
            
    
    </div>
)
}
