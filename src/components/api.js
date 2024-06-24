import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL

export  const fetchUserDetails = async (userId) => {
    try{
        const response = await axios.get(`${API_URL}/user/${userId}`);
        if(response.data.user){
            return response.data.user[0]
            
        } 
    }catch(error){
        console.log(error);
    }
}

export const fetchBioData = async (userId) => {
    try{
        const response = await axios.get(`${API_URL}/user/bio-data/${userId}`); 
        if(response.data.biodata !== null){
            return response.data.biodata[0];
        }
    }catch(error){
        console.log(error);
    }  
}
