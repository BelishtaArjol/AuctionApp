import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import axios from 'axios';
//The styling is based on material ui 

const Auth = () => {
    //this component also redirects the user to the registration form, if that use doesn't have an active account
    const navigate = useNavigate();

    //the local states and a request are determined to logg in the user and set the token and the username to the local storage 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/token/", {
            username: username,
            password: password,
        })
            .then((res) => {
                localStorage.setItem("token", res.data.access);
                localStorage.setItem("username", username);
                navigate("/")
            })
            .catch((err) => alert(err.response.data.detail));
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                p: 2,
            }}>
            <Paper
                elevation={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
                    <Lock />
                </Avatar>
                <Typography
                    variant='h5'
                    component='h2'
                > Sign in
                </Typography>
                <Box component='form' mt={2} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                id='username'
                                required
                                fullWidth
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                id='password'
                                required
                                fullWidth
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                />}
                                label={'Remember me!'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                            >Sign in
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                href='/register'
                                variant='body2'
                                sx={{ display: 'block', textAlign: 'right' }}
                            >
                                Don't have an account? Sign up here.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default Auth;