import React from 'react';
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import "./AddApplication.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

function AddApplication() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = async (applicationData) => {
        console.log(applicationData);
        try {
            const { data } = await axios.post('http://localhost:4000/add-application', applicationData, { withCredentials: true })
            if (data.status == true) {
                navigate('/')
            } else {
                toast.error(data.error, { position: 'top-center' })
            }

        } catch (errors) {
            console.log(errors);
        }
    }

    return (
        <section>
            <h1> Application Form </h1>
            <form id='forms' onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col' >
                <div className='add'>
                    <div>
                        <input placeholder='Name' type='text' {...register('name', {
                            required: { value: true, message: "This field is required" }
                        })} />
                        {errors.name && <p className='error'>{errors.name.message}</p>}
                    </div>
                    <div>
                        <input placeholder='Address' type='text'  {...register('address', {
                            required: { value: true, message: "This field is required" }
                        })} />
                        {errors.address && <p className='error'>{errors.address.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <input placeholder='City' type='text' {...register('city', {
                            required: { value: true, message: "This field is required" }
                        })} />
                        {errors.city && <p className='error'>{errors.city.message}</p>}
                    </div>
                    <div>
                        <input placeholder='State' type='text'  {...register('state', {
                            required: { value: true, message: "This field is required" }
                        })} />
                        {errors.state && <p className='error'>{errors.state.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <input placeholder='Email' type='text' {...register('email', {
                            required: { value: true, message: "This field is required" }
                        })}
                        />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                    </div>
                    <div>
                        <input placeholder='Phone no' type='text'
                            {...register('phone', {
                                required: { value: true, message: "This field is required" }
                            })} />
                        {errors.phone && <p className='error'>{errors.phone.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <input placeholder='Company Name' type='text'
                            {...register('company', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.company && <p className='error'>{errors.company.message}</p>}
                    </div>
                    <div>
                        <input type='text' placeholder='Describe Your Team and Background'
                            {...register('describe', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.describe && <p className='error'>{errors.describe.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <textarea id='team' type='text' placeholder='Describe Your Company and Products'
                            {...register('products', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.products && <p className='error'>{errors.products.message}</p>}
                    </div>
                    <div>
                        <textarea id='team' type='text' placeholder='Describe the problem you are trying to solve'
                            {...register('problem', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.problem && <p className='error'>{errors.problem.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <textarea id='team' type='text' placeholder='What is unique about your solution'
                            {...register('solution', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.company && <p className='error'>{errors.company.message}</p>}
                    </div>
                    <div>
                        <textarea id='team' type='text' placeholder='What is your value proposition for the customer'
                            {...register('customer', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.customer && <p className='error'>{errors.customer.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <textarea id='team' type='text' placeholder='Explain your marketing strategy'
                            {...register('strategy', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.strategy && <p className='error'>{errors.strategy.message}</p>}
                    </div>
                    <div>
                        <textarea id='team' type='text' placeholder='Who are your compitators and what is your compatitve advantage '
                            {...register('advantage', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.advantage && <p className='error'>{errors.advantage.message}</p>}
                    </div>
                </div>
                <div className='add'>
                    <div>
                        <textarea id='team' type='text' placeholder='Explain your revenue model'
                            {...register('revenue', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.revenue && <p className='error'>{errors.revenue.message}</p>}
                    </div>
                    <div>
                        <textarea id='team' type='text' placeholder='Give a detailed buisness proposal'
                            {...register('proposal', {
                                required: { value: true, message: "This field is required" }
                            })}
                        />
                        {errors.proposal && <p className='error'>{errors.proposal.message}</p>}
                    </div>
                </div>
                <div className='typeInc'>
                    <h4 style={{ color: 'white', marginBottom: '5px' }}>Type of Incubation needed.</h4>
                    <input type='radio' id='physical' name='incubation' value='physical'
                        {...register('type', {
                            required: { value: true, message: "This field is required" }
                        })}
                    />
                    <label for='physical' style={{ color: 'white', marginLeft: '10px' }}>Physical Incubation</label><br></br>
                    <input type='radio' id='vertual' name='incubation' value='vertual'
                        {...register('type', {
                            required: { value: true, message: "This field is required" }
                        })}
                    />
                    <label for='virtual' style={{ color: 'white', marginLeft: '10px' }}>Virtual Incubation</label>
                    {errors.type && <p className='error'>{errors.type.message}</p>}
                </div>
                <div>
                    <Button variant="contained" type='submit' style={{ marginBottom: '80px' }} >Submit</Button>
                </div>
            </form>

        </section>
    )
}

export default AddApplication;