import React from 'react'
import { render } from 'react-dom'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'
import './index.css'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons'

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
                    <div>Medical Expenses: <FontAwesomeIcon className='more-info1' icon={faInfoCircle} /><div className='tooltip-1'>The total amount you've spent on medical bills, you can give us your best estimate.</div></div>
                    <Field className='dollar-field' type = 'number' name = 'medExp' placeholder = '0' />
                </label>
                <label>
                    <div>Property Damage: <FontAwesomeIcon className='more-info2' icon={faInfoCircle} /><div className='tooltip-2'>What's your best estimate for the total costs of replacing your vehicle and/or any personal property damaged in the accident.</div></div>
                    <Field className='dollar-field' type = 'number' name = 'propDmg' placeholder = '0' />
                </label>
                <label>
                    <div>Lost Wages: <FontAwesomeIcon className='more-info3' icon={faInfoCircle} /><div className='tooltip-3'>How much money have you lost from missed work due to the accident?</div></div>
                    <Field className='dollar-field' type = 'number' name = 'lostWages' placeholder = '0' />
                </label>
                <label>
                    <div>Lost Future Earnings: <FontAwesomeIcon className='more-info4' icon={faInfoCircle} /><div className='tooltip-4'>Estimate of how much money you will miss out on from future work due to your injury.</div></div>
                    <Field className='dollar-field' type = 'number' name = 'lostFutureEarnings' placeholder = '0' />
                </label>
                <label>
                    <div>Future Medical Expenses: <FontAwesomeIcon className='more-info5' icon={faInfoCircle} /><div className='tooltip-5'>How much do you think this injury will cost you in future medical expenses?</div></div>
                    <Field className='dollar-field' type = 'number' name = 'futureMedExp' placeholder = '0' />
                </label>

                <div className='get-results-wrapper centered-spaced-column'>

                    <label>
                        Please enter your name:<div></div>
                        <Field className='name-field' type = 'name' name = 'name' placeholder = 'Name' />
                    </label>

                    <label>
                        Please enter your e-mail:<div></div>
                        <Field className='email-field' type = 'email' name = 'email' placeholder = 'Email' />
                    </label>
                    <label>
                        <Field className='acknowledgementBox' type = 'checkbox' name = 'acknowledged' checked = {values.acknowledged} />
                        I understand that this number is only an estimate and not a guarantee of any sort.
                    </label>
                    <button className='centered-column'>Get Results</button>
                </div>
            </Form>
        </div>

        <div className='results-window hide'>
            <h3 className='results-words'>You could be entitled to a settlement of ${values.total}!</h3>
            <a onClick={()=>{var popUp = document.querySelector('.results-window');
                            popUp.classList.toggle('hide');
                            popUp.classList.toggle('show');}}>
                <h3 className='close-button'>- CLOSE -</h3>
            </a>
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

        values.total = 0+values.medExp+values.propDmg+values.lostWages+values.lostFutureEarnings+values.futureMedExp;

        var popUp = document.querySelector('.results-window');
        
        popUp.classList.toggle('hide');
        popUp.classList.toggle('show');
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
