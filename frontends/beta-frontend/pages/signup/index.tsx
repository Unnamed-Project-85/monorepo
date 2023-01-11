import React from 'react'
import { Box, Button, Card, CardContent, CardHeader, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { CenterContainer } from '@/shared/layout'
import { NextPageWithLayout } from '@/pages/_app'
import { API_HOST } from '@/config/config'

interface SignUpFormValues {
  username: string
  password: string
  confirmPassword: string
}

const SignUpPage: NextPageWithLayout = () => {
  const { handleSubmit, control, watch } = useForm<SignUpFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  return (
    <Card>
      <CardHeader title='Create an account' component={Box} />
      <CardContent>
        <form
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            rowGap: '1rem'
          }}
          onSubmit={handleSubmit(async ({ username, password }) => {
            const response = await fetch(`${API_HOST}/auth/sign-up`, {
              method: 'POST',
              body: JSON.stringify({ username, password }),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            if (response.ok) {
              console.info('Account created successfully', response.json())
            } else {
              console.error('There was an error with the creation of the account')
            }
          })}>
          <Controller
            name='username'
            control={control}
            defaultValue=''
            rules={{ required: 'Username required' }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextField
                label='Username'
                variant='filled'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{ required: 'Password required' }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextField
                label='Password'
                variant='filled'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                type='password'
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            rules={{
              required: 'Password required',
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match'
                }
              }
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextField
                label='Confirm Password'
                variant='filled'
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                type='password'
              />
            )}
          />
          <div>
            <Button type='submit' variant='contained' color='primary'>
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

SignUpPage.getLayout = (page) => <CenterContainer>{page}</CenterContainer>

export default SignUpPage
