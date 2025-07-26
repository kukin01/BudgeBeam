import React from 'react'
import { LoginSchema } from "../../types/form-schema"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email } from 'zod/v4';

function myForm(){
    const { register, handleSubmit, formState: { errors } } = useForm<typeof LoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:'',
            password:''
        }})
}
const onSubmit=(data: typeof LoginSchema) => {
    console.log(data);
}

const Login:React.FC = () => {
  return (
    <form > 
    </form>
  )
}

export default Login;
