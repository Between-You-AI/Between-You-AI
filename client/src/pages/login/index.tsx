import React, { useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  loginApi,
  LoginDto,
  LoginResponse,
  loginSchema,
} from '@core';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../hoc/auth-context/use-auth-context';

const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginDto>(
    loginApi
  );

  const onSubmit = (loginDto: LoginDto) => {
    loginMutation.mutate(loginDto, {
      onSuccess: (loginResponse) => {
        login(loginResponse);
        navigate('/');
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        bgcolor="white"
        borderRadius="8px"
        boxShadow={3}
        p={4}
        mt={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="passCode"
          label="Enter Passcode"
          autoComplete="passCode"
          autoFocus
          {...register('passCode')}
          error={!!formState.errors.passCode}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
