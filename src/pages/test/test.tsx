import React, { useState } from 'react'
import axios from 'axios'

// 1. usestate ochish
// 2. inputdagi valuelarni onchange bilan usestateda saqlash
// 3. eventhandler funkisya ochamiz
// 4. funksiyani button ning onclick qismiga qo'shamiz

export default function Test() {

    const [firstName, setfirstName] = useState<string>("")
    const [lastName, setlastName] = useState<string>("")
    const [password, setpassword] = useState<string>("")

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await axios.post(
            "http://3.111.157.221/api/v1/parent/register/",
            {
                first_name: firstName,
                last_name: lastName,
                password: password,
            }
        ).then((res) => console.log(res)).catch((err) => console.log(err))
    }

    return (
        <div className='test'>
            <br /><br />
            <input placeholder='firstname' onChange={(e) => setfirstName(e.target.value)} type="text" /><br /><br />
            <input placeholder='lastname' onChange={(e) => setlastName(e.target.value)} type="text" /><br /><br />
            <input placeholder='password' onChange={(e) => setpassword(e.target.value)} type="text" /><br /><br />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
