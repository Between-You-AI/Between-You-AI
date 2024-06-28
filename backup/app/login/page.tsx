"use client";

import React, {useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginDto, loginSchema} from "@core";
import {useForm} from "react-hook-form";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Microsoft as MicrosoftIcon,
} from "@mui/icons-material";
import {useRouter} from "next/navigation";

// TODO: Complete login authentication and using for all pages
const LoginPage = () => {
  const router = useRouter();
  const {register, handleSubmit, formState} = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  // const navigate = useNavigate();
  // const { login } = useAuthContext();

  // const loginMutation = useMutation<LoginResponse, AxiosError, LoginDto>(
  //   loginApi
  // );

  const onSubmit = (loginDto: LoginDto) => {
    console.log(loginDto);
    router.push("/dashboard");
    // loginMutation.mutate(loginDto, {
    //   onSuccess: (loginResponse) => {
    //     login(loginResponse);
    //     navigate('/');
    //   },
    // });
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        display="flex"
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Log In to You & AI
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your email and password below
        </Typography>
        <TextField
          label="Email address"
          variant="outlined"
          margin="normal"
          fullWidth
          {...register("email")}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          id="passCode"
          {...register("passCode")}
          error={!!formState.errors.passCode}
        />
        <Link href="#" variant="body2" sx={{alignSelf: "flex-end"}}>
          Forgot password?
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{mt: 2}}
        >
          Log In
        </Button>
        <Typography variant="body2" sx={{mt: 2}}>
          Don&apos;t have an account? <Link href="#">Sign up</Link>
        </Typography>
        <Typography variant="body2" sx={{mt: 2}}>
          OR
        </Typography>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{mt: 1}}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<MicrosoftIcon />}
          fullWidth
          sx={{mt: 1}}
        >
          Sign in with Teams
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
