import axios from 'axios';
import React,{useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Img from './Img';

function Create() {
    const [hname, setHname] = useState("");
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [group, setGroup] = useState("");
    const [image, setImage] = useState("")
    const [uploadedImg, setUploadedImg] = useState("")

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
            const result = await axios.post("http://localhost:4000/api/v1/property/",property )
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
        <div className="flex items-center justify-center h-screen">
            <form  onSubmit={handleSubmit} className="w-full max-w-lg" encType="multipart/form-data">
                <div className="flex flex-col  mb-6">
                    <div className="flex justify-center align-center ">
                        <h4 className="text-gray-800 font-semibold">Please Provide Hotel Details In The Form Below</h4>
                    </div>
                    <div className="field">
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
                        <input 
                            className="formInput" 
                            type="text" 
                            name="country"
                            placeholder="Country"
                            value={country}
                             onChange={(e)=>setCountry(e.target.value)}
                        />
                    </div>
                    <div className="field">
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
                        <input 
                            className="formInput"
                            type="file" 
                            name="file" 
                            placeholder="Group"
                            onChange={handleImage}
                        />
                    </div>

                    <div>
                        <button type="submit"className="formBtn mr-4">Add Hotel</button> 
                        <Link to="/">
                            <button className='bg-gray-500 focus:outline-none text-white font-bold py-2 px-4 rounded'>Close</button>
                        </Link>
                    </div>
                </div>
            </form>  
        </div>
        <img src={image} className=" " alt="selected" />
        <Img uploadedImg={uploadedImg} alt="" />
    </>
  )
}

export default Create
