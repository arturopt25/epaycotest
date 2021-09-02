import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Formulario from '../Components/Formulario';
import Info from '../Components/Info';


const SignInOutContainer = () => {

    const paperStyle= {width:340, margin:"20px auto"}

    const tabStyle = {fontSize: 12}

    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    

      function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box >
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }


    return (
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab style={tabStyle} label="Ingrese sus datos" />
          
          <Tab style={tabStyle} label="Pagos automaticos" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Formulario handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Info/>
        </TabPanel>
      </Paper>
    );
}

export default SignInOutContainer
