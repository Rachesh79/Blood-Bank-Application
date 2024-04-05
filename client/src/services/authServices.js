export const handleLogin = (e, email, password, role) => {
    e.preventDefault()
    try {
        if(!role || !email || !password){
            return alert("Plese provide valid credentials")
        }
        console.log('login', e, email, password, role);
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
                    console.log('Register',e,
              name,
              email,
              password,
              organizationName,
              hospitalName,
              role,
              address,
              website,
              phone);
                } catch (error) {
                    console.log(error);
                }
}   