import React from 'react'
import axios from 'axios'
const Text = () => {
    const url = "https://api.imgbb.com/1/upload?key=94ac8ba2a9f530d9cdd93df805f1c7d6"
    const fetchData=async()=>{
const res = await fetch(url);
console.log(res);
    }
   React.useEffect(() => {
    fetchData()
    }, [])
    
  function  uploadImage(img) {
        let body = new FormData()
        body.set('key', 'an_api_key')
        body.append('image', img)
    
        return axios({
          method: 'post',
          url: 'https://api.imgbb.com/1/upload',
          data: body
        })
      }
  return (
    <div>
        <h1>Test</h1>
       
        <input onChange={(event)=>uploadImage(event.target.files[0])} type="file" />
    </div>
  )
}

export default Text