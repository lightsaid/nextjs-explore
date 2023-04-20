"use client"

import { FormEvent, useRef } from "react"

type LoginForm = {
    "telphone": string,
    "password": string,
    "type": "0"
}



const Login = () => {
    const telPhoneInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let telphone = telPhoneInput.current?.value.trim()
        let password = passwordInput.current?.value.trim()

        if (telphone === "" || password === "") {
            alert("手机号和密码必填")
            return
        }

        let data: LoginForm = {
            telphone: telphone!,
            password: password!,
            type: "0"
        }

        const response = await fetch(`http://localhost:2000/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()

        console.log(res)

    }

    return (
        <div className="bg-gray-100 min-w-[100vw] min-h-[100vh] overflow-hidden pt-[30vh]">
            <div className="bg-white max-w-[400px] p-6 rounded-md mx-auto">
                <div>
                    <h1 className="text-center text-2xl py-2">登录</h1>
                </div>
                <form className="pt-4" onSubmit={(event) => handleLogin(event)}>
                    <div className="form-item mb-10 flex items-center">
                        <label htmlFor="telphone" className="inline-block w-[60px] text-right mr-3">手机号</label>
                        <input type="text" name="telphone" ref={telPhoneInput} className="border flex-1 p-1 px-3 rounded-md" placeholder="请输入手机号码" id="telphone" />
                    </div>
                    <div className="form-item mb-10 flex items-center">
                        <label htmlFor="password" className="inline-block w-[60px] text-right mr-3">密码</label>
                        <input type="text" name="password" ref={passwordInput} className="border flex-1 p-1 px-3 rounded-md" placeholder="请输入密码" id="password" />
                    </div>
                    <div className="form-item flex justify-center items-center mb-3">
                        <button type="submit" className="w-[60%] py-1 text-white rounded-md bg-cyan-500">登录</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login