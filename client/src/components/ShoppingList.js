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
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames='fade'>
                                <ListGroupItem>
                                    {props.isAuthenticated ? <Button className='remove-btn'
                                        color='danger'
                                        size='sm'
                                        onClick={() => onDeleteClick(_id)}>&times;</Button> : null}
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
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)
