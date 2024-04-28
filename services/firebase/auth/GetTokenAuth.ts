import { onAuthStateChanged } from "firebase/auth"
import { authFirebase } from "../AuthFirebase"

export function getAccessToken(){
    
    let value = () =>{
        return new Promise<string>((resolve, reject) => {
            onAuthStateChanged(authFirebase, async (user) =>{
                if(user){
                    let token = await user.getIdToken(true)
                    resolve(token)
                }else{
                    reject("Not found a user")
                }
            })
        })
    }
    let token = value().then(token => {
        return token
    })
    return token
}
