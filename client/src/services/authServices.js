import { userLogin, userRegister } from '../redux/features/auth/authActions'
import store from '../redux/store'

export const handleLogin = (e, email, password, role) => {
    e.preventDefault()
    try {
        if(!role || !email || !password){
            return alert("Plese provide valid credentials")
        }
        store.dispatch(userLogin({email,password,role}))
    } catch (error) {
        console.log(error);
    }
}


export const handleRegister = (e,
              name,
              email,
              password,
              organizationName,
              hospitalName,
              role,
              address,
              website,
              phone) => {
                e.preventDefault()

                try {
                    store.dispatch(userRegister({name,
              email,
              password,
              organizationName,
              hospitalName,
              role,
              address,
              website,
              phone}))
                } catch (error) {
                    console.log(error);
                }
}   