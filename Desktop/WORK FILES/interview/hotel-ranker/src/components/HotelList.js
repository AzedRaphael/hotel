import React, { useEffect } from 'react'
import axios from "axios"
import {FaEdit,FaTrash, FaEye} from "react-icons/fa"
import { Link,useParams } from 'react-router-dom'
import Loading from "./Loading"
import { useProductsContext } from '../context/ProductContext';
import TextTruncate from "react-text-truncate"
// var TextTruncate = require("react-text-truncate")

  // const getLocalStorage= ()=>{
  //   let list = localStorage.getItem("list")
  //   if(list){
  //     return JSON.parse(localStorage.getItem("list"))
  //   }else{
  //     return []
  //   }
  // }

function HotelList() {
  const {id} = useParams()
  const { single_product_loading: loading,products:prod } = useProductsContext();
  // useEffect(()=>{
  //   localStorage.setItem("list", JSON.stringify(prod))
  // },[prod])
  
  const [search, setSearch] = React.useState(" ")

  if (loading) {
    return <Loading />;
  }
  const removeItem = async ()=>{
    try {
      await axios.delete(`https://hotel-ranking-api.herokuapp.com/api/v1/property/${id}`)
    } catch (error) {
      console.error(error)
    }
  }
 
  // const capFirstLetter = (str)=>{
  //   const arr = str.split(" ")
  //   for(let i=0; i<arr.length; i++){
  //     arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1)
  //   }
  //   return arr.join(" ")
  //  }
  
  return (
    <>
      <form>
        <div className='flex justify-center align-center gap-3 mt-5'>
          <input 
                type="text"
                placeholder="Search for names, groups and address" 
                className="w-1/2 outline-blue-200 bg-gray-100 text-black-700 border border-black-700 rounded py-3 px-4 leading-tight hover:outline outline-2 hover:outline-gray-900"
                onChange={(e)=> setSearch(e.target.value)}
              />
        </div>
      </form>

      <section className='container'>
        <div className='flex flex-row justify-center align-center'>
            <div className='grid grid-cols-1 justify-center rounded md:grid-cols-2 lg:grid-cols-3 '>
                {
                    prod.filter((val)=>{
                      if(search === ""){
                        return val
                      }else if(val.hname.toLowerCase().includes(search.toLowerCase())){
                        return val
                      }
                    }).
                      map((item)=>(
                        <div key={item._id} className="w-80 border-2 mx-4 my-4 border-gray-600 rounded">
                            <div>
                                <img alt="card-image" src={item.image}className="w-80 h-40"/> 
                            </div>
                            <div className='h-22 m-2'>
                              {/* <h1>{capFirstLetter(item.hname)}</h1> */}
                              <h1>{item.hname}</h1>
                              <TextTruncate 
                                line={1}
                                element="p"
                                truncateText="..."
                                // text={capFirstLetter(item.address)}
                                text={item.address}
                                
                              />
                            </div>
                            <div className='flex flex-row justify-around align-center my-3'>
                              <Link to={`/hotel/view/${item._id}`}>
                                  <FaEye className='text-yellow-800' />
                              </Link>
                              <Link to={`/hotel/edit/${item._id}`}>
                                  <FaEdit className='text-green-400'/>
                              </Link>
                              <button onClick={()=>removeItem()}>
                                  <FaTrash className='text-red-400'/>
                              </button>
                            </div>
                        </div>
                    ))
                }
            </div>
          </div>
      </section>
    </>
  )
}

export default HotelList
