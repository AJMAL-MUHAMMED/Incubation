import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



function AdminLogin() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem("adminToken")
        if (token) {
            navigate('/admin/applicationList')
        }

    }, [])
    const onSubmit = async (adminData) => {
        try {
            const { data } = await axios.post('http://localhost:4000/admin/login', adminData, { withCredentials: true })
            if (data.status == true) {
                localStorage.setItem("adminToken", data.token)
                navigate('/admin/applicationList')
            } else {
                toast.error(data.error, { position: 'top-center' })
            }

        } catch (error) {

            console.log(error)
        }

    }
    return (
        <section className='App'>
            <div className='register'>
                <div className='col-1'>
                    <h2> Admin Login</h2>
                    <form
                        id='form'
                        className='flex flex-col'
                        onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder='email' {...register('email', { required: { value: true, message: "Email is required" }, pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Enter a valid email" } })} />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                        <input type="text" placeholder='password'{...register("password", { required: { value: true, message: "Password is required" }, minLength: { value: 6, message: "Password should be contain 7 characters long" } })} />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                        <button className='btn'>Submit</button>
                    </form>

                </div>

            </div>
        </section>
    )
}

export default AdminLogin