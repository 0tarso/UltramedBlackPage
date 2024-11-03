import { addDoc, collection, } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { useState } from 'react'

const useFirebase = () => {
    const [successfullyRegistered, setSuccessfullyRegistered] = useState(false)

    const saveNumber = async (name, phone) => {
        if (!name || !phone) {
            return
        }

        try {
            const collectionRef = collection(db, 'users')
            const data = {
                name: name,
                phone: phone,
                createdAt: new Date()
            }
            await addDoc(collectionRef, data)

            localStorage.setItem('@isRegistered', true)
            localStorage.setItem('@userRegistered', JSON.stringify(data))

            setSuccessfullyRegistered(true)
        }
        catch (error) {
            console.error(error)
        }
    }

    return {
        saveNumber,
        successfullyRegistered
    }
}

export default useFirebase