import React, { useContext, useEffect, useReducer,useState } from 'react'
// import {useParams} from "react-router-dom"
import reducer from '../reducers/ProductsReducer'
import axios from "axios"

import {
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
  } from '../actions'
const initialState = {
products_loading: true,
products_error:false,
products:[],
single_product_loading:false,
single_product_error:false,
single_product:[]
}

const url = 'https://hotel-ranking-api.herokuapp.com'
//console.log(url)
const ProductsContext = React.createContext()

export function ProductProvider({children}) {
  //const { id } = useParams()
    //const [product, setProduct] = useState([])
    const [state,dispatch] = useReducer(reducer,initialState)
    useEffect(()=>{
        fetchProducts()
    },[])
    
    const fetchProducts = async()=>{
         
        
        try {
            
            const response = await axios.get(`${url}/api/v1/property`)
            dispatch({ type: GET_PRODUCTS_BEGIN })
            const property = response.data
            
            dispatch({ type: GET_PRODUCTS_SUCCESS, payload: property })
        } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR })
        }      
       
    }
    const fetchSingleProduct = async (id) => {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
      try {
        const response = await axios.get(`${url}/api/v1/property/?id=${id}`)
        const objValues = response.data
        const  productArr=Object.values(objValues)
        const singleProduct =productArr[0]
        
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
      } catch (error) {
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
      }
    }
    
    // const postProperty = async (id) => {
    //   dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    //   try {
    //     const response = await axios.post(`${url}/api/v1/property/`)
    //     const objValues = response.data
    //     const  productArr=Object.values(objValues)
    //     const singleProduct =productArr[0]
        
    //     dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    //   } catch (error) {
    //     dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    //   }
    // }
    
  return (
    <ProductsContext.Provider value={{...state,fetchSingleProduct}}>
        {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext=()=>{
    return useContext(ProductsContext)
}

