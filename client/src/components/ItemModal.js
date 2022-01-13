import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const ItemModal = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');

    const toggle = () => {
        setOpenModal(!openModal);
    }

    const onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: name
        }

        // Add item via addItem action
        props.addItem(newItem);

        toggle();
    }

    return (
        <div>
            <div className='slist'>
                <div className='slist-container'>
                    {props.isAuthenticated ? <Button
                        color='dark'
                        style={{ marginBottom: '2rem' }}
                        onClick={toggle}
                    >Add Item</Button> : <h4 className='mb-3 ml-4'>Please login first</h4>}

                </div>
            </div>

            <Modal
                isOpen={openModal}
                toggle={toggle}
            >
                <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Label for='item'>Item</Label>
                            <Input type='text'
                                name='name'
                                id='item'
                                placeholder='Add shopping item'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <Button
                                color='dark'
                                style={{ marginTop: '2rem' }}
                                block>
                                Add Item
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

ItemModal.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addItem })(ItemModal)
