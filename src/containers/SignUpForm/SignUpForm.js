import React, { Component } from 'react';
import classes from './SignUpForm.module.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class SignUpForm extends Component {
    state = {
        contactForm: {
            firstName: {
                elementType: 'input',
                label: 'First Name',
                size: 'half',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Jane'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                label: 'Last Name',
                size: 'half',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Doe'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            npiNumber: {
                elementType: 'input',
                label: 'NPI Number (10 digits)',
                size: 'full',
                elementConfig: {
                    type: 'number',
                    placeholder: '1234567890'
                },
                value: '',
                validation: {
                    required: true,
                    length: 10
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                label: 'Address',
                size: 'full',
                elementConfig: {
                    type: 'text',
                    placeholder: '0000 Street Rd'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                label: 'City',
                size: 'half',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Sunshine'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                label: 'State',
                size: 'half',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Florida'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                label: 'Zip Code',
                size: 'half',
                elementConfig: {
                    type: 'number',
                    placeholder: '12345'
                },
                value: '',
                validation: {
                    required: true,
                    length: 5
                },
                valid: false,
                touched: false
            },
            phoneNum: {
                elementType: 'input',
                label: 'Phone Number',
                size: 'full',
                elementConfig: {
                    type: 'number',
                    placeholder: '(000)123-1234'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                label: 'Email',
                size: 'full',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email@domain.com'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules) {
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.minLength) {
                isValid = value.length >= rules.minLength && isValid;
            }
    
            if (rules.length) {
                isValid = value.length === rules.length && isValid;
            }
        }

        return isValid;
    }

    formHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.contactForm) {
            formData[formElementIdentifier] = this.state.contactForm[formElementIdentifier].value;
        }
        
        console.log(formData);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.contactForm
        }
        const updatedFormElement = {...updatedForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({contactForm: updatedForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.contactForm) {
            formElementsArray.push({
                id: key,
                config: this.state.contactForm[key]
            });
        }

        return (
            <div className={classes.SignUpForm}>

                <p>Already a member? <a href="/">Sign In.</a></p>

                <form onSubmit={this.formHandler} className={classes.Form}>
                    {formElementsArray.map(formElement => (
                        <Input 
                            key={formElement.id}
                            label={formElement.config.label}
                            size={formElement.config.size}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType='Success' disabled={!this.state.formIsValid}>SIGN UP</Button>
                </form>

            </div>
        );
    }
}

export default SignUpForm;