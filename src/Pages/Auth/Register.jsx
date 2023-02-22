import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import axios from 'axios';
//the styling is based on material ui

const Auth = () => {
    const navigate = useNavigate();
    //this component redirects the user the the login page, if he has an active account
    //we send the local state data to the backend by making a post request, also the validation of input fields is made  
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length >= 3 && username.length <= 20 && password.length >= 6 && password === password2) {
            axios.post("http://127.0.0.1:8000/create-user", {
                email: email,
                password: password,
                first_name: firstname,
                last_name: lastname,
                username: username,
                password2: password2
            })
            navigate("/login")
        } else {
            alert("CAREFUL!\n1-Password must be at least 8 characters long.\n2-Username must be between 3 and 20 characters long! \n3-Password and Password2 should match! ")
        }
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
                > Sign up
                </Typography>
                <Box component='form' mt={2} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                id='firstname'
                                type="text"
                                value={firstname}
                                required
                                fullWidth
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                id='lastname'
                                type='text'
                                value={lastname}
                                required
                                fullWidth
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Email Address"
                                id='email'
                                required
                                fullWidth
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
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
                            <TextField
                                label="Confirm Password"
                                id='password2'
                                required
                                fullWidth
                                type='password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                    required={true}
                                />}
                                label={'I accept all terms and conditions.'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                fullWidth
                            >Sign up
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Link
                                href='/login'
                                variant='body2'
                                sx={{ display: 'block', textAlign: 'right' }}
                            >
                                Already have an account? Sign in here.
                            </Link>
                        </Grid>

                    </Grid>
                </Box>
            </Paper>
        </Container>
    )
}

export default Auth;