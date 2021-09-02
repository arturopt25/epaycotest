import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage}  from 'formik';
import *  as Yup from 'yup';




const Info = ({handleChange}) => {

    const paperStyle={padding: 20, height: '36vh', width: 300, margin: "0 auto"}
    const avatarStyle= {backgroundColor: '#02CAF8'}
    const buttonStyle= {margin:'8px 0'}
    const headerStyle= {
      margin:0,
      fontFamily: 'roboto',
      fontWeight: 300,
      fontSize: 16,
      padding: 25,
    }

    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, #02CAF8 30%, blue 90%)',
          borderRadius: 4,
          border: 0,
          color: 'white',
          height: 48,
          padding: '25px 30px',
          margin:'25px 0',
          fontFamily: 'roboto',
          fontSize: 18,
          fontWeight: 300,
        },
        label: {
          textTransform: 'capitalize',
        },
      });

      const classes = useStyles();

      const initialValues={
          documento:'',
          
      }

      const validationSchema= Yup.object().shape({
        documento:Yup.number()
        .positive('Introduzca solo numeros positivos')
        .required('Campo requerido')
        .integer('Solo numeros enteros')
        .typeError('Debe especificar solo numeros de documento'),
        
      })

      const onSubmit=(values, props)=>{
          console.log(values)
          setTimeout(()=>{
            props.resetForm()
            props.setSubmitting(false)
          }, 2000)
      }

      

    return (
      <Grid>
        
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AccountBalanceOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Suscriba sus facturas para pagos automáticos </h2>
          </Grid>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                 
                <Field as={TextField}
                  label="Número de identificación del usuario"
                  name="documento"
                  placeholder="Ingrese Documento"
                  fullWidth
                  required
                  helperText={<ErrorMessage name="documento"/>}
                />
                
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  disabled={props.isSubmitting}
                  classes={{
                    root: classes.root, // class name, e.g. `classes-nesting-root-x`
                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                  }}
                >
                 {props.isSubmitting? "Cargando": "Continuar"}
                </Button>
              </Form>
            )}
          </Formik>

          
        </Paper>
      </Grid>
    );
}

export default Info
