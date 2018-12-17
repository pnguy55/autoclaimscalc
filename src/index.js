import React from 'react'
import { render } from 'react-dom'
import { withFormik } from 'formik'
import Yup from 'yup'
import './index.css'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

const App = ({
    values,
    handleChange,
    handleSubmit
}) => (
    <form onSubmit={handleSubmit}>
        <input type = 'email' name = 'email' placeholder = 'Email' value = {values.email} onChange = {handleChange} />
        <input type = 'password' name = 'password' placeholder = 'Password' value = {values.password} onChange = {handleChange} />
        <button>Submit</button>
    </form>
)

const FormikApp = withFormik({
    mapPropsToValues( {email, password} ) {
        return {
            email: email || '',
            password: password || ''
        }
    },
    handleSubmit(values) {
        //axios here
        console.log(JSON.stringify(values))
        axios({
            method: 'post',
            url: 'https://m1onjfbto8.execute-api.us-east-1.amazonaws.com/mailer/mailer',
            data: JSON.stringify(values)
          });
    }
})( App )

render(<FormikApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
