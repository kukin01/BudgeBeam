'use client'
import React from 'react'
import { SignupType, SignupSchema} from '@/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { error } from 'console'


export default function signup() {
  const router = useRouter();
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  })
  return(
    <div className='bg-white flex flex-col items-center justify-center h-auto w-md p-6'>
      <div className='flex flex-col items-center text-primary font-bold'>
        <h1>Welcome to BudgeBeam</h1>
        <h2>Signup</h2>
      </div>
      <form className='flex flex-col mt-4 gap-4 w-full px-6'>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='firstname'>First Name</Label>
          <Input type='text' id='firstname' placeholder='First Name' {...register('firstname')}/>
          {errors.firstname && <p className='text-sm text-red-500'>{errors.firstname.message}</p>}
        </div>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='lastname'>Last Name</Label>
          <Input type='text' id='lastname' placeholder='Last Name' {...register('lastname')}/>
          {errors.lastname && <p className='text-sm text-red-500'>{errors.lastname.message}</p>}
        </div>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='email'>Email</Label>
          <Input type='email' id='email' placeholder='Email' {...register('email')}/>
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col gap-3'>
            <Label htmlFor='password'>Password</Label>
            <Input type='password' id='password' placeholder='Password' {...register('password')}/>
            {errors.password && <p className='text-sm text-error'>{errors.password.message}</p>}
          </div>
        </div>
        <div className='flex flex-col items-center '>
          <Button className='w-full text-white mb-2' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Link href='/auth/login' className='text-sm text-input'>Already have an account?</Link>
        </div>
      </form>
    </div>
  )
}