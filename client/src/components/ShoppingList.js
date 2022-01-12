import { useEffect } from 'react'
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types'

const ShoppingList = (props) => {
    useEffect(() => {
        props.getItems();
    }, [])

    const { items } = props.item;

    const onDeleteClick = id => {
        props.deleteItem(id);
    }


    return (
        <div className='slist'>
            <div className='slist-container'>
                <ListGroup>
                    <TransitionGroup className='shopping-list'>
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    <Button className='remove-btn'
                                        color='danger'
                                        size='sm'
                                        onClick={() => onDeleteClick(id)}>&times;</Button>
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

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)