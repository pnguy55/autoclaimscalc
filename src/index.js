import React from 'react'
import { render } from 'react-dom'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import './index.css'
import * as serviceWorker from './serviceWorker'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons'


const App = ({
    values,
    errors,
    touched
}) => (
    <div className = 'wrapper'>
        <nav>
            <h1>Auto Injury Claims Calculator</h1>
        </nav>
        <div className = 'form-wrapper'>
            <Form >
                
                <label className='numberEntry'>
                    <div>Past Lost Wages: <FontAwesomeIcon className='more-info3' icon={faInfoCircle} /><div className='tooltip-3 tooltip'>How much money have you lost from missed work due to the accident?</div></div>
                    <Field onSelect={()=>{
                                values.lostWagesProg++;
                                if(values.lostWagesProg === 1){values.progress++;}}} className='lostWages dollar-field' type = 'number' name = 'lostWages' placeholder = '' />
                    {touched.lostWages && errors.lostWages && <p className='error-message'>*{errors.lostWages}</p>}
                </label>
                <label className='numberEntry'>
                    <div>Future Lost Wages: <FontAwesomeIcon className='more-info4' icon={faInfoCircle} /><div className='tooltip-4 tooltip'>Estimate of how much money you will miss out on from future work due to your injury.</div></div>
                    <Field onSelect={()=>{
                                values.lostFutureEarningsProg++;
                                if(values.lostFutureEarningsProg === 1){values.progress++;}}} className='dollar-field' type = 'number' name = 'lostFutureEarnings' placeholder = '' />
                    {touched.lostFutureEarnings && errors.lostFutureEarnings && <p className='error-message'>*{errors.lostFutureEarnings}</p>}
                </label>
                <label className='numberEntry'>
                    <div>Past Medical Expenses: <FontAwesomeIcon className='more-info1' icon={faInfoCircle} /><div className='tooltip-1 tooltip'>The total amount you've spent on medical bills, you can give us your best estimate.</div></div>
                    <Field  onSelect={()=>{
                                values.medExpProg++;
                                if(values.medExpProg === 1){values.progress++;}}} className='dollar-field' type = 'number' name = 'medExp' placeholder = {values.medExp} />
                    {touched.medExp && errors.medExp && <p className='error-message'>*{errors.medExp}</p>}

                </label>
                <label className='numberEntry'>
                    <div>Future Medical Expenses: <FontAwesomeIcon className='more-info5' icon={faInfoCircle} /><div className='tooltip-5 tooltip'>How much do you think this injury will cost you in future medical expenses?</div></div>
                    <Field onSelect={()=>{
                                values.futureMedExpProg++;
                                if(values.futureMedExpProg === 1){values.progress++;}}} className='dollar-field' type = 'number' name = 'futureMedExp' placeholder = '' />
                    {touched.futureMedExp && errors.futureMedExp && <p className='error-message'>*{errors.futureMedExp}</p>}
                </label>
                <label className='numberEntry'>
                    <div>Past Months of Treatment: <FontAwesomeIcon className='more-info6' icon={faInfoCircle} />
                        <div className='tooltip-6 tooltip'>

                            <div>
                                How many months of treatment have you gone through already?
                            </div>
                        </div>
                    </div>
                    <Field onSelect={()=>{
                                values.painAndSufferingProg++;
                                if(values.painAndSufferingProg === 1){values.progress++;}}} className='dollar-field' type = 'number' name = 'painAndSuffering' placeholder = '' />
                    {touched.painAndSuffering && errors.painAndSuffering && <p className='error-message'>*{errors.painAndSuffering}</p>}
                </label>
                <label className='numberEntry'>
                    <div>Future Months of Treatment: <FontAwesomeIcon className='more-info7' icon={faInfoCircle} />
                        <div className='tooltip-7 tooltip'>

                            <div>
                                How many months of treatment do you expect to go through in the future?
                            </div>
                        </div>
                    </div>
                    <Field onSelect={()=>{
                                values.futurePainAndSufferingProg++;
                                if(values.futurePainAndSufferingProg === 1){values.progress++;}}} className='dollar-field' type = 'number' name = 'futurePainAndSuffering' placeholder = '' />
                    {touched.futurePainAndSuffering && errors.futurePainAndSuffering && <p className='error-message'>*{errors.futurePainAndSuffering}</p>}
                </label>

                <div className='get-results-wrapper centered-spaced-column'>

                    <label>
                        Enter your name:<div></div>
                        <Field onSelect={()=>{
                                values.nameProg++;
                                if(values.nameProg === 1){values.progress++;}}} autoComplete='new-password' className='name-field' type = 'name' name = 'name' placeholder = 'Name' />
                         {touched.name && errors.name && <p className='error-message'>*{errors.name}</p>}
                    </label>

                    <label>
                        Enter your e-mail:<div></div>
                        <Field onSelect={()=>{
                                values.emailProg++;
                                if(values.emailProg === 1){values.progress++;}}} autoComplete='new-password' className='email-field' type = 'email' name = 'email' placeholder = 'Email' />
                        {touched.email && errors.email && <p className='error-message'>*{errors.email}</p>}
                    </label>
                    <label className='checkBoxLabel'>
                        <Field className='acknowledgementBox' type = 'checkbox' name = 'acknowledged' defaultChecked = {values.acknowledged!==true?null:values.acknowledgedProg++ && values.acknowledgedProg===2?values.progress++:null} />
                        <div>
                            <p>I understand that this number is only an estimate and I am okay with being contacted with more information and advice.</p>
                            {touched.acknowledged && errors.acknowledged && <p className='error-message'>*{errors.acknowledged}</p>}
                        </div>
                    </label>
                    <label className='checkBoxLabel'>
                        <Field  className='acknowledgementBox' type = 'checkbox' name = 'emailAllow' defaultChecked = {values.emailAllow!==true?null:values.emailAllowProg++ && values.emailAllowProg===2?values.progress++:null} />
                        <div>
                            <p>I am okay with receiving a follow up emails with tips and other important info.</p>
                            {touched.emailAllow && errors.emailAllow && <p className='error-message'>*{errors.emailAllow}</p>}
                        </div>
                    </label>          
                    <button type = 'submit' className='centered-column'>Get Results</button>
                </div>
            </Form>
        </div>

        <div className='results-window hide'>
            <div className='results-wrap'>
                <h3 className='results-words'>You could be entitled to a settlement of <span>${values.total = (((parseFloat(values.futurePainAndSuffering)+parseFloat(values.painAndSuffering))*1500)+(parseFloat(values.medExp)+parseFloat(values.futureMedExp)+parseFloat(values.lostWages)+parseFloat(values.lostFutureEarnings)))}!</span></h3>
                <div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>

                <a href='javascript:void(0)' onClick={()=>{var popUp = document.querySelector('.results-window');
                                popUp.classList.toggle('hide');
                                popUp.classList.toggle('show');}}>
                    <h3 className='close-button'>- CLOSE -</h3>
                    
                </a>
            </div>
        </div>        
        <div className='progress-bar'>
        <h3>Progress Bar</h3>
            <ul>
                <li className={values.progress >= 1 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 2 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 3 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 4 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 5 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 6 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 7 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 8 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 9 ? 'filled-in' : "''"}></li>
                <li className={values.progress >= 10 ? 'filled-in' : "''"}></li>
            </ul>
        </div>
    </div>

)

const FormikApp = withFormik({
    mapPropsToValues( {medExp, futureMedExp, lostWages, lostFutureEarnings, painAndSuffering, futurePainAndSuffering, email, name, acknowledged, emailAllow,
                        medExpProg, lostWagesProg, lostFutureEarningsProg, futureMedExpProg, painAndSufferingProg,
                        futurePainAndSufferingProg,nameProg, emailProg, acknowledgedProg, emailAllowProg} ) {
    
        return {

            medExp: medExp || '',
            lostWages: lostWages || '',
            lostFutureEarnings: lostFutureEarnings || '',
            medExpProg: medExpProg || '',
            futureMedExp: futureMedExp || '',
            painAndSuffering: painAndSuffering || '',
            futurePainAndSuffering: futurePainAndSuffering || '',

            subject: "Claims Calculator Results",
            progress: 0,
            
            lostWagesProg: lostWagesProg || 0,
            lostFutureEarningsProg: lostFutureEarningsProg || 0,
            futureMedExpProg: futureMedExpProg || 0,
            painAndSufferingProg: painAndSufferingProg || 0,
            futurePainAndSufferingProg: futurePainAndSufferingProg || 0,

            name: name || '',
            nameProg: nameProg || 0,
            email: email || '',
            emailProg: emailProg || 0,
            total: 0,
            acknowledged: acknowledged || false,
            acknowledgedProg: acknowledgedProg || 0,
            emailAllow: emailAllow || false,
            emailAllowProg: emailAllowProg || 0
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        medExp: Yup.number().min(0,'Medical expense must be at least 0').required("Medical expenses are required."),
        lostWages: Yup.number().min(0,'Lost wages must be at least 0').required('Lost wages are required.'),
        lostFutureEarnings: Yup.number().min(0,'Lost future earnings must be at least 0').required('Lost future earnings are a required.'),
        futureMedExp: Yup.number().integer().min(0,'Future medical expense must be at least 0').required('Future medical expenses are required.'),
        painAndSuffering: Yup.number().integer('Please enter a whole number').min(0, 'Months of treatment must be at least 0').required('Months of treatment is required.'),
        futurePainAndSuffering: Yup.number().integer('Please enter a whole number').min(0, 'Months of treatment must be at least 0').required('Months of treatment is required.'),
        acknowledged: Yup.boolean().oneOf([true], 'Must Accept Acknowledgement'),
        emailAllow: Yup.boolean().oneOf([true], 'You must allow a follow up email to view your estimate.')
    }),
    handleSubmit(values) {


        var popUp = document.querySelector('.results-window');
        
        popUp.classList.toggle('hide');
        popUp.classList.toggle('show');
        //axios here
        console.log(JSON.stringify(values))
        // axios({
        //     method: 'post',
        //     url: 'https://m1onjfbto8.execute-api.us-east-1.amazonaws.com/mailer/mailer',
        //     data: JSON.stringify(values)
        //   });
    }
})( App )

render(<FormikApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
