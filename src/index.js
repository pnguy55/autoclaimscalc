import React from 'react'
import { render } from 'react-dom'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import './index.css'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'

const App = ({
    values,
    handleChange
}) => (
    <div className = 'wrapper'>
        <nav>
            <h1>Auto Injury Claims Calculator</h1>
        </nav>
        <div className = 'form-wrapper'>
            <Form>
                <label>
                    Medical Expenses:&nbsp;
                    <Field type = 'number' name = 'medExp' placeholder = '$' />
                </label>
                <label>
                    Property Damage:&nbsp;
                    <Field type = 'number' name = 'propDmg' placeholder = '$' />
                </label>
                <label>
                    Lost Wages:&nbsp;
                    <Field type = 'number' name = 'lostWages' placeholder = '$' />
                </label>
                <label>
                    Lost Future Earnings:&nbsp;
                    <Field type = 'number' name = 'lostFutureEarnings' placeholder = '$' />
                </label>
                <label>
                    Future Medical Expenses:&nbsp;
                    <Field type = 'number' name = 'futureMedExp' placeholder = '$' />
                </label>
                <label>
                    Please enter your name:&nbsp;
                    <Field type = 'name' name = 'name' placeholder = 'Name' />
                </label>

                <label>
                    Please enter your e-mail:&nbsp;
                    <Field type = 'email' name = 'email' placeholder = 'Email' />
                </label>
                <label>
                    <Field type = 'checkbox' name = 'acknowledged' checked = {values.acknowledged} />
                    I understand that this number is only an estimate and not a guarantee of any sort.
                </label>
                <h3>You could be entitled to a settlement of ${values.thingie = 0+values.medExp+values.propDmg+values.lostWages+values.lostFutureEarnings+values.futureMedExp}!</h3>
                <button>Get Results</button>
            </Form>
        </div>
        <div className='progress-bar'>
        <h3>Progress Bar</h3>
            <ul>
                <li className={values.medExp != '' ? 'filled-in' : "''"}></li>
                <li className={values.propDmg != '' ? 'filled-in' : "''"}></li>
                <li className={values.lostWages != '' ? 'filled-in' : "''"}></li>
                <li className={values.lostFutureEarnings != '' ? 'filled-in' : "''"}></li>
                <li className={values.futureMedExp != '' ? 'filled-in' : "''"}></li>
                <li className={values.name != '' ? 'filled-in' : "''"}></li>
                <li className={values.email != '' ? 'filled-in' : "''"}></li>
                <li className={values.acknowledged != '' ? 'filled-in' : "''"}></li>
            </ul>
        </div>
    </div>

)

const FormikApp = withFormik({
    mapPropsToValues( {medExp, propDmg, lostWages, lostFutureEarnings, futureMedExp ,email, name, acknowledged} ) {

        return {
            subject: "Claims Calculator Results",
            medExp: medExp || 0,
            propDmg: propDmg || 0,
            lostWages: lostWages || 0,
            lostFutureEarnings: lostFutureEarnings || 0,
            futureMedExp: futureMedExp || 0,
            name: name || '',
            email: email || '',
            total: '',
            acknowledged: acknowledged || false
        }
    },
    handleSubmit(values) {

        values.total = values.name+values.email;
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
