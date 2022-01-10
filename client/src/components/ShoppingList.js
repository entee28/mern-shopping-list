import React, { useState } from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
const uuid = require('uuid')


const ShoppingList = () => {
    const [items, setItems] = useState(
        [
            { id: uuid.v4(), name: 'Eggs' },
            { id: uuid.v4(), name: 'Milk' },
            { id: uuid.v4(), name: 'Steak' },
            { id: uuid.v4(), name: 'Water' },
        ]
    );

    return (
        <div className='slist'>
            <div className='slist-container'>
                <Button color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={() => {
                        const name = prompt('Enter Item');
                        if (name) {
                            setItems([...items, { id: uuid.v4(), name }])
                        }
                    }}>
                    Add Item
                </Button>

                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({id, name}) => (
                            <CSSTransition key={id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <Button className='remove-btn'
                                    color='danger'
                                    size='sm'
                                    onClick={() => {
                                        setItems(items.filter(item => item.id !== id))
                                    }}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </div>
        </div>
    )
}

export default ShoppingList
