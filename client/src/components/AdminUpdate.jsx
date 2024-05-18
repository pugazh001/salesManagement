import React, { useEffect, useState } from 'react'
import { Typography,Box,TextField ,Toolbar,AppBar,Button} from '@mui/material'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function AdminUpdate() {

    const navigate=useNavigate();
  const[inputs,setInputs]=useState({
    
  })
  const handleChange=(e)=>{
    setInputs((preState)=>({
      ...preState,
      [e.target.name]:e.target.value
      

    }))
  }
  const [lead,setLeads]=useState();
  const id=useParams().id;
  console.log(id);
  const fetchDetails=async()=>{
    const res=await axios.get(`http://localhost:5551/api/lead/${id}`)
    .catch(err=>console.log(err));
    const data=res.data;
    console.log("dats",data);
    return data;
  }
  useEffect(()=>{

    fetchDetails().then(data=>{
      setLeads(data.lead)
      setInputs({name:data.lead.name,email:data.lead.email,mobile:data.lead.mobile,productOfInterst:data.lead.productOfInterst})
    })


  },[id])
  console.log("id change",lead);
  

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate('/userdata'))


  }
  const sendRequest=async()=>{
    const res=axios.put(`http://localhost:5551/api/lead/update/${id}`,{
      name:inputs.name,
      email:inputs.email,
      mobile:inputs.mobile,
      productOfInterst:inputs.productOfInterst
        
    }).catch(err=>console.log("ed",err))
    const data=res.data;
    console.log("input",data);
    return data
  }
  return (
    <div>
         <AppBar>
        <Toolbar>
        <Typography sx={{fontStyle:"oblique"}}>UpDateForm</Typography>
           <Box>
            <Button>LogOut</Button>
           </Box>
          
           <button className='button'  onClick={()=>navigate("/auth")}>Logout</button>
        </Toolbar>
        </AppBar> 

        <form onSubmit={handleSubmit}>
           
            <Box maxWidth={"400px"} display={'flex'} flexDirection={"column"} alignItems={'center'} justifyContent={'center'}
        boxShadow={"10px 10px 10px 10px #ccc" }
        padding={1}
        margin={'auto'}
        marginTop={5}
        borderRadius={5}
        
      >
          <Typography variant='h4' padding={1} textAlign={'center'}>Admin Update Data</Typography>
    
        
         
         <TextField  onChange={handleChange}  name='name'             value={inputs.name} placeholder='name' type='text' margin='normal'></TextField>
          <TextField onChange={handleChange} name='email'             value={inputs.email} placeholder='email' type='email' margin='normal'></TextField>
          <TextField onChange={handleChange} name='mobile'            value={inputs.mobile} placeholder='Mobile' type='text' margin='normal'></TextField>
          <TextField onChange={handleChange} name='productOfInterst'  value={inputs.productOfInterst} placeholder='ProductOfInterset' type='text' margin='normal'></TextField>
          
          <Button sx={{marginTop:2}} variant='contained' color='info' type='submit' onClick="">Update</Button>
          
        </Box>
        </form>
    </div>
  )
}

export default AdminUpdate;