import {toast} from 'react-toastify'
import API from '../../../services/API'
import {createAsyncThunk} from '@reduxjs/toolkit'



export const userLogin = createAsyncThunk (
    'auth/login',
    async ({role,email,password},{rejectWithValue}) => {
        try{
            const {data} = await API.post('auth/login',{role,email,password})
            // store token
            if(data.success){
                localStorage.setItem('token',data.token)
                alert(data.message)
                window.location.replace('/')
            }
            return data
        }
        catch(error){
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }
            else{
                return rejectWithValue(error.message)
            }
        }
    }

)


// register

export const userRegister = createAsyncThunk(
    'auth/register',
    async ({
            name,
              email,
              password,
              organizationName,
              hospitalName,
              role,
              address,
              website,
              phone
    },{rejectWithValue})=>{
        try {
            const {data} = await API.post('/auth/register',{name,
              email,
              password,
              organizationName,
              hospitalName,
              role,
              address,
              website,
              phone})
              if(data.success){
                // toast.success(data.message)
                window.location.replace('/login')
              }
        } catch (error) {
            console.log(error);
             if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }
            else{
                return rejectWithValue(error.message)
            }
        }
    }
)


export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async({rejectWithValue}) => {
        try{
            const res = await API.get('/auth/current-user')
            if(res?.data){
                return res?.data
            }
        }
        catch(error){
            console.log(error);
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)