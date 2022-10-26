import React,{useEffect} from 'react'
import { useParams,Link,useHistory} from 'react-router-dom'
import Loading from './Loading'
import { useProductsContext } from '../context/ProductContext';


function HotelDetails() {
  const history = useHistory()
    const { id } = useParams();

    const {
      single_product_loading: loading,
      single_product_error: error,
      single_product:products,
      fetchSingleProduct,
    } = useProductsContext();
  
    let isApiSubscribed;
    useEffect(() => {
      isApiSubscribed = true;
      if(isApiSubscribed){
        fetchSingleProduct(`${id}`)
      }
      // eslint-disable-next-line
      return ()=>{
        isApiSubscribed = false;
      }
    }, [id]);
    
    useEffect(() => {
      if (error) {
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
      // eslint-disable-next-line
    }, [error]);
    
    if (loading) {
      return <div ><Loading /></div>;
    }
    if (error) {
      // return <Error />;
      <h1>ERROR MESSAGE HERE</h1>
    }

    const capFirstLetter = (str)=>{
      const arr = str.split(" ")
      for(let i=0; i<arr.length; i++){
        arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1)
      }
      return arr.join(" ")
      //return str.charAt(0).toUpperCase() + str.slice(1);
     }
    return (
    <div>
      <div className='text-center font-bold mt-6'>Hotel Details</div>
        {
          products.filter((prod)=>prod._id === id).map((product)=>{
            const {image, hname, country, address, city, _id} = product
            return (
              <article key ={_id} className="flex flex-row justify-center rounded align-center border-2 border-gray-700 w-1/3 mx-auto">
                <div className=''>
                  <img src={image} className="w-full"/>
                  <h2 className='font-bold'>{capFirstLetter(hname)}</h2>
                  <p>{capFirstLetter(city)}<span> {country}</span></p>
                  <p>{capFirstLetter(address)}</p>
                  
                  <Link to="/">
                    <button className='formBtn my-2'>Back</button>
                  </Link>
                </div>
              </article>
            )
          })
      }
    </div>
  )
}

export default HotelDetails
