
"use client"

import React, { useState } from 'react' //  properties ni DB lo store it.
import styles from './components.module.css';
import { productAction } from '../serverActions/productAction';

const AddProduct = () => {
    const [title,setTitle] = useState("");
    const [price,setPrice] = useState("");
    const [offer,setOffer] = useState("");
    const [amen,setAmen] = useState("");
    const [desc,setDesc] = useState("");
    const [image,setImage] = useState("");

    // Function 
    const recordHandler = async(e)=>{
        e.preventDefault()
       
      // POST ROUTE call cheyalli.
      // DAta route.js file lo data.
          const data = new FormData()
          data.append('title', title);
          data.append('price', price);
          data.append('offer', offer);
          data.append('desc', desc);
          data.append('amen', amen);
          data.append('image', image);

          // await productAction(data)
      
          try {
            const response = await fetch(`https://sunset-valley-retreat.vercel.app/api/admin/add-product`,{
                method:'POST',
                body:data
              });

              const result = await response.json() //Bdata come here.
              if(result.success){
                alert("Record Added Successfully")
                // input fields clear it
                setTitle("")
                setPrice("")
                setOffer("")
                setDesc("")
                setAmen("")
                setImage("")
              }
          } catch (error) {
            console.log(error); 
          }


        try {
            await productAction(recordDetails)
        } catch (error) {
            console.log(error);   
        }
        
    }
        
  return (
    
    //  classname --> dynamic ga define it component admin side nuchi come it
    <div className={styles.container}>
    <h1>Add Record</h1>
    <form onSubmit={recordHandler} encType='multipart/form-data'>
     <div className={styles.fields}>
    <div className="">
    <h3>Title</h3>
    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </div>
     <div>
     <h3>Price</h3>
     {/* onChange={(e)=>setPrice(Number(e.target.value))} */}
     <input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
     </div>
     </div>
     <div  className={styles.fields}>
    <div className="">
    <h3>Offer</h3>
    <input type="number" value={offer} onChange={(e) => setOffer(e.target.value === "" ? "" : Number(e.target.value))} />
    </div>
      <div className="">
      <h3>Amenities</h3>
      <input type="text" value={amen} onChange={(e)=>setAmen(e.target.value)}/>
      </div>
     </div>
    <div className={styles.textField}>
    <h3>Description</h3>
    <textarea  rows="5" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
    </div>
     <div className={styles.textField}>
     <h3>Upload Image</h3>
      <input type="file" accept='image/*' onChange={(e)=>setImage(e.target.files[0])}/> 
     </div>
    <div className={styles.submit}>
    <button type='submit'>
      Submit
     </button>
    </div>
    </form>
  </div>
  )
}

export default AddProduct
