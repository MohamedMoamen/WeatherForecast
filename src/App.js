import './App.css';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import moment from "moment";
import "moment/min/locales";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import {useState,useEffect} from "react";
function App() {
  const [locale,setLocale]=useState("ar");
  const [direction,setDirection]=useState("rtl"); 
  const { t, i18n } = useTranslation();
  const [temp,setTemp]=useState({degree:null,min:null,max:null,description:"",icon:""});
  const [dateAndTime,setDateAndTime]=useState(null);
  useEffect(()=>{
    moment.locale("ar");
    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    const controller=new AbortController();
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=46.7&lon=24.7&appid=bb9ebeb0e4dd73cf3b93a7ecef9fa1b1',{
      signal:controller.signal,
    })
    .then(function(response){
      console.log(response);
      const responseDegree=Math.round(response.data.main.temp-272.15);
      const responseMin=Math.round(response.data.main.temp_min-272.15);
      const responseMax=Math.round(response.data.main.temp_max-272.15);
      const responseDescription=response.data.weather[0].description;
      const responseIcon=response.data.weather[0].icon;
      console.log(responseIcon);
      setTemp({degree:responseDegree
        ,min:responseMin
        ,max:responseMax
        ,description:responseDescription
        ,icon:`https://openweathermap.org/img/wn/${responseIcon}@2x.png`})
        
        console.log(temp.degree);
    })
    .catch(function(error){
      console.log(error);
    })
    return()=>controller.abort()
  },[])
  function handleLanguageChange(){
    if(locale=="en"){
    setLocale("ar");
    i18n.changeLanguage("ar");
    moment.locale("ar");
    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    setDirection("rtl");
  }else if(locale=="ar"){
    setLocale("en");
    i18n.changeLanguage("en");
    moment.locale("en");
    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    setDirection("ltr");
  }
  }
  return (
    <div className="App">
      <Container maxWidth="sm">
        <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
         {/* Card */}
         <div dir={direction} style={{borderRadius:"15px",width:"100%",backgroundColor:"green"}}>
            
            <div style={{padding:"10px",display:"flex",flexDirection:"column",color:"white",justifyContent:"start"}}>
            {/* City And Time */}
            <div style={{display:"flex",flexDirection:"row"}}>
               <div>
                <Typography variant="h2" gutterBottom>
                 {t("Riyadh")} 
                </Typography>
               </div>
               <div style={{display:"flex",alignItems:"end"}}>
                <Typography variant="h5" gutterBottom>
                 {dateAndTime}
                </Typography>
               </div>
            </div>
            {/* ***City And Time*** */}
            <hr style={{fontSize:"30px",width:"100%"}}/>
            {/* CloudIcon And Degrees */}
            <div style={{display:"flex",flexDirection:"row",gap:"60px"}}>
              {/* Degrees */}
              <div style={{display:"flex",flexDirection:"column"}}>
                  {/* Number And Icon */}
                  <div style={{display:"flex",flexDirection:"row"}}>
                       {/* Number */}
                       <div>
                        <Typography variant="h2" gutterBottom>
                        {temp.degree}
                        </Typography>
                       </div>
                       {/* ***Number*** */}
                       {/* Icon */}
                       <div>
                        <img src={temp.icon} alt=""/>
                       </div>
                       {/* ***Icon*** */}
                  </div>
                  {/* ***Number And Icon*** */}
                  {/* Description,Min And max */}
                  <div style={{display:"flex",flexDirection:"column"}}>
                   {/* Description */}
                   <div>
                    <Typography variant="h5" gutterBottom>
                        {t(temp.description)}
                        </Typography>
                   </div>
                   {/* ***Description*** */}
                  </div>
                  {/* Min And Max */}
                  <div style={{display:"flex",flexDirection:"row",gap:"10px"}}>
                    <Typography variant="h6" gutterBottom>
                        {t("Min")} :  {temp.min}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                         | 
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                        {t("Max")} :  {temp.max}
                        </Typography>

                  </div>
                  {/* ***Min And Max*** */}
                  {/* ***Description,Min And Max*** */}


              </div>
               {/* ***Degrees*** */}
               {/* CloudIcon */}
               <div style={{display:"flex",width:"17vw",height:"100%",justifyContent:"end",transform:"translateY(-20px)"}}>
                <CloudIcon style={{fontSize:"10rem"}}>

                </CloudIcon>
               </div>
               {/* ***CloudIcon*** */}
            </div>
            {/* ***CloudIcon And Degrees*** */}
            </div>
          </div>
        {/* ***Card*** */}
        {/* Button */}
         <div dir={direction} style={{width:"100%",display:"flex",justifyContent:"end"}}>
         <Button onClick={handleLanguageChange} variant="text" style={{color:"white"}}>{locale=="en"?"Arabic":"إنجليزي"}</Button>
        </div>
        {/* ***Button*** */}
        </div>
      </Container>
    </div>
  );
}

export default App;
