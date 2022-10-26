import React,{useState} from 'react'
import {useParams,useHistory,Link} from "react-router-dom"
import axios from "axios"
import Img from './Img';
// import Loading from './Loading'
// import { useProductsContext } from '../context/ProductContext';

function Edit() {

  const history = useHistory()
  React.useEffect(()=>{
    console.log("re-rendered")
    handleSubmit()
  },[])
  
  const [hname, setHname] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [group, setGroup] = useState("");
  const [image, setImage] = useState("");

  // const[data, setData] = useState([])

  const {id} = useParams()

  
  const handleImage = (e)=>{
    const file = e.target.files[0]
    previewFiles(file);
}

const previewFiles = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
        setImage(reader.result)
    }
}

const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!image)return
    try { 
        const property ={hname, country, city, address, image, group}
        //const result = await axios.post("https://hotel-ranking-api.herokuapp.com/api/v1/property/", {
        await axios.patch(`https://hotel-ranking-api.herokuapp.com/api/v1/property/${id}`)
        history.push("/")
    } catch (error) {
        console.error(error)
    }
}

  React.useEffect(()=>{
    async function fetchData(){
        try {
          const response = await axios.get(`https://hotel-ranking-api.herokuapp.com/api/v1/property/${id}`)
          const property = response.data
          setAddress(property.address)
          setCity(property.city)
          setHname(property.hname)
          setGroup(property.group)
          setImage(property.image)
          setCountry(property.country)
          // setData(property)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [id])
  

  return (
    <div className="flex items-center justify-center h-screen mt-2 mx-2">
        <form encType="multipart/form" className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col  mb-6">
                <div className="flex justify-center align-center my-2">
                    <h4 className="text-gray-800 font-semibold">Edit Hotel Details</h4>
                </div>
                <div className="field">
                    <label 
                        className="formLabel"    
                    >
                        Hotel's name
                    </label>
                    <input 
                        type="text" 
                        name="hname" 
                        placeholder="Name" 
                        className="formInput"
                        value={hname}
                        onChange={(e)=>setHname(e.target.value)}
                    />
                </div>
                
                <div className="field">
                    <label className="formLabel" >
                        Hotel's Country
                    </label>
                    <input 
                        className="formInput" 
                        type="text" 
                        name="country" 
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label className="formLabel" >
                        Hotel's Address
                    </label>
                    <input 
                        className="formInput" 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="formLabel" >
                        Hotel's City
                    </label>
                    <input 
                        className="formInput" 
                        type="text" 
                        name="city" 
                        placeholder="City" 
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="formLabel" >
                        Hotel's Group
                    </label>
                    <input 
                        className="formInput" 
                        type="text" 
                        name="group" 
                        placeholder="Group"
                        value={group}
                        onChange={(e)=>setGroup(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label className="formLabel" >
                        Hotel's Image
                    </label>
                    <input 
                        className="formInput" 
                        type="file" 
                        name="file" 
                        placeholder="Group"
                        onChange={handleImage}
                    />
                    <img src="" className=" " />
                </div>

                <div>
                    {/* {isLoading ? <button disabled={true} className="formBtn">Adding Hotel...</button> : <button type="submit"className="formBtn"onClick={handleSubmit}>Add Hotel</button> } */}
                    <button type="submit"className="formBtn" >Edit Hotel</button> 
                    <Link to="/">
                        <button className=''>Close</button>
                    </Link>
                </div>
            </div>
        </form>  
        <img src={image} className="" alt="selected" />
        {/* <Img uploadedImg={uploadedImg} alt="" /> */}
    </div>
  )
}

export default Edit