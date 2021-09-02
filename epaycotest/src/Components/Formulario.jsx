import {React, useState, useEffect} from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage}  from 'formik';
import *  as Yup from 'yup';
import axios from 'axios';
import { Modal, Table } from 'antd';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { DataGrid } from '@material-ui/data-grid';

const SwalComponent = withReactContent(Swal)





const Formulario = ({handleChange}) => {

    const paperStyle={padding: 20, height: '36vh', width: 300, margin: "0 auto"}
    const avatarStyle= {backgroundColor: '#02CAF8'}
    const buttonStyle= {margin:'8px 0'}
    const headerStyle= {
      margin:0,
      fontFamily: 'roboto',
      fontWeight: 300,
      fontSize: 18,
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
          run(values.documento, props)
          
      }

      //Consumo de la API
      

      const instance = axios.create({
        baseURL: "https://apify.epayco.co/"
      });

      const login = async () => {
        return await instance.post("/login/mail", {}, {
            auth: {
                username: "pruebafront@payco.co",
                password: "pruebafront$2020"
            }
        }).then( response =>{
            return response.data.token
        }).catch( error => {
            console.dir(error.message);
            return "ERROR";
        });
    }
    const consultarCampos = async (token)=> {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return await instance.post(
            '/billcollect/proyect/config/consult', 
            {
                "projectId": 29
            },
            config)
        .then(response => {
            return response.data
        }).catch( error => {
            console.dir(error.message);
            return "ERROR";
        });
    }
    const consultarFacturas = async (token, document)=> {
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        return await instance.post(
            '/billcollect/invoices/consult', 
            {
                "projectId": 29,
                document
            },
            config)
        .then(response => {
            return response.data
        }).catch( error => {
            console.dir(error.message);
            return "ERROR";
        });
    }

    const [users, setUsers] = useState(null);

    const run = async (documento, props) => {
        const token = await login()
       
        const campos = await consultarCampos(token)
        
        const facturas = await consultarFacturas(token, documento)
        
        
        setUsers({campos, facturas})
        props.resetForm()
        props.setSubmitting(false)
        
    }
    
    console.log(users)
    
    
    

    

    
    //Logica de modales
   

    
    const modalHandler = () => {
      Swal.fire({
        title: 'Error',
        text: 'Debe introducir un documento valido',
        icon: 'warning',
        confirmButtonText: 'Ir al formulario'
      })
      
    }

    




    const modalPrueba = () => {
      let titulo = '';
      let cuerpo = '';
      const campos = users.campos.data
      const facturas = users.facturas.data.bills
      for (let index = 0; index < campos.length; index++) {
        titulo += ` <th>${campos[index].name} </th>`

        
      }

      for (let index = 0; index < facturas.length; index++) {
        cuerpo += '<tr>'
        for (let index2 = 0; index2 < campos.length; index2++) {
          cuerpo+= `<td data-label="${campos[index2].name} ">${facturas[index][campos[index2].key] ? facturas[index][campos[index2].key] : '-'}</td>`
          
        } 
        cuerpo += '</tr>'
        
      }
      Swal.fire({
        title: 'Detalle de Factura',
        
        html:
          `<table>
          <thead>
            <tr>
              ${titulo}
            </tr>
          </thead>
          <tbody>
            ${cuerpo}
          </tbody>
        </table>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          users.facturas.data.bills.length > 1 ? 'Pagar facturas' : 'Pagar factura',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          'Cancelar',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
        if (result.isConfirmed) {
          modalPayment()
        }else{

        }
      })

      
    }

    const modalPayment = () => {
      Swal.fire({
        title: 'Confirmar pago',
        text: "Factura por pagar",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Pagado!',
            'Su factura ha sido cancelada.',
            'success'
          )
        }
      })
    }

    
   
    

    

    return (
      <Grid>
            {users ? (users.facturas.data.bills.length > 0 ? modalPrueba(): modalHandler() )  : null}
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <PermIdentityOutlinedIcon />
            </Avatar>
            <h2 style={headerStyle}>Consulte sus facturas </h2>
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

export default Formulario
