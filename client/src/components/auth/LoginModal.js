import { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';

const LoginModal = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const toggle = () => {
        // Clear errors
        props.clearErrors();

        setOpenModal(!openModal);
    }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const { error, isAuthenticated } = props;
    const prevError = usePrevious({ error });

    useEffect(() => {
        if (prevError !== error) {
            if (error.id === 'LOGIN_FAIL') {
                setMsg(error.msg.msg)
            } else {
                setMsg(null);
            }
        }

        // If authenticated, close modal
        if (openModal) {
            if (isAuthenticated) {
                toggle();
            }
        }
    }, [error, prevError, msg])

    const onSubmit = e => {
        e.preventDefault();

        const user = {email, password}

        //Attempt to login
        props.login(user)
    }

    return (
        <div>
            <div className='slist'>
                <div className='slist-container'>
                    <NavLink onClick={toggle} href='#'>Login</NavLink>
                </div>
            </div>

            <Modal
                isOpen={openModal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    {msg ? (<Alert color='danger'>{msg}</Alert>) : null}
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Label for='email'>Email</Label>
                            <Input type='email'
                                name='email'
                                id='email'
                                placeholder='Email'
                                value={email}
                                className='mb-3'
                                onChange={(e) => setEmail(e.target.value)} />
                            <Label for='password'>Password</Label>
                            <Input type='password'
                                name='password'
                                id='password'
                                placeholder='Password'
                                value={password}
                                className='mb-3'
                                onChange={(e) => setPassword(e.target.value)} />
                            <Button
                                color='dark'
                                style={{ marginTop: '2rem' }}
                                block>
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)
