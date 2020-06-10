import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import {ErrorMessage, Field, Form, Formik, useField} from "formik";
import {string, object} from "yup";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';
import {loginThunk} from "../../redux/thunks";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        padding: "5px 0"
    },
    errorMsg: {
        color: "red"
    }
}));

const LoginSchema = object().shape({
    username: string().max(40, 'Слишком длинное имя').required('Укажите имя пользователя'),
    password: string().max(40, 'Слишком длинный пароль').required('Введите пароль'),
});

export const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const MyField = ({label, type, ...props}) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : null;
        return (
            <>
                <Field {...field}
                       as={TextField}
                       type={type}
                       error={!!errorText}
                       label={label}
                       helpertext={errorText}
                       variant="outlined"
                       margin="normal"
                       fullWidth
                />
                <ErrorMessage render={(msg) => <span className={classes.errorMsg}>{msg}</span>} name={props.name}/>
            </>
        );
    };

    const alert = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async (data) => {
        try {
            await dispatch(loginThunk(data));
            history.push('/users');
        } catch (error) {
            alert();
            console.error(error)
        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <Snackbar open={open}
                      autoHideDuration={5000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={handleClose}
            >
                <Alert onClose={handleClose}
                       severity="error"
                >
                    Неверное имя пользователя или пароль
                </Alert>
            </Snackbar>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Войдите в систему
                </Typography>
                <Formik
                    initialValues={{username: "test_super", password: "Nf<U4f<rDbtDxAPn"}}
                    onSubmit={handleSubmit}
                    useHistory
                    validationSchema={LoginSchema}
                >
                    {() => (
                        <Form className={classes.form} noValidate autoComplete="off">
                            <MyField name="username" label="Username" type="text"/>
                            <MyField name="password" label="Password" type="password"/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Войти
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};