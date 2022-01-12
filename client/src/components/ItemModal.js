import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

const uuid = require('uuid')

const ItemModal = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');

    const toggle = () => {
        setOpenModal(!openModal);
    }

    const onSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: uuid.v4(),
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
                    <Button
                        color='dark'
                        style={{ marginBottom: '2rem' }}
                        onClick={toggle}
                    >Add Item</Button>
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
                            style={{marginTop: '2rem'}}
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

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal)
