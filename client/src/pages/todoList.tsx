import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './todo.css'
import { getData, setItemText, setIsUpdating, setUpdateItemText } from '../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'

const ToDoList = () => {
    // const [itemText, setItemText] = useState('');
    const [listItems, setListItems] = useState([{ _id: '', item: '' }]);
    // const [isUpdating, setIsUpdating] = useState('');
    // const [updateItemText, setUpdateItemText] = useState('');
    const todoData = useSelector((state: any) => state.articleTransfer.value)
    const itemText = useSelector((state: any) => state.articleTransfer.text)
    const isUpdating = useSelector((state: any) => state.articleTransfer.isUpdating)
    const updateItemsText = useSelector((state: any) => state.articleTransfer.updateItemText)
    const dispatch = useDispatch()

    const addItem = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5500/api/item', { item: itemText })
            dispatch(getData((prev: any) => [...prev, res.data]))
            // setListItems(prev => [...prev, res.data]);
            dispatch(setItemText(''))
            // setItemText('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5500/api/items')
                // setListItems(res.data);
                dispatch(getData(res.data))
                console.log('render', res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);

    const deleteItem = async (id: any) => {
        try {
            const res = await axios.delete(`http://localhost:5500/api/item/${id}`)
            const newListItems = todoData.filter((item: any) => item._id !== id);
            dispatch(getData(newListItems))
            // setListItems(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    //Update item
    const updateItem = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, { item: updateItemsText })
            const updatedItemIndex = todoData.findIndex((item: any) => item._id === isUpdating);
            window.location.href = '/'
            const updatedItem = todoData[updatedItemIndex].item = updateItemsText;
            dispatch(setUpdateItemText(''));
            dispatch(setIsUpdating(''))
            // setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }
    //before updating item we need to show input field where we will create our updated item
    const renderUpdateForm = () => (
        <form className="update-form" onSubmit={(e) => { updateItem(e) }} >
            <input className="update-new-input" type="text" placeholder="New Item" onChange={e => { dispatch(setUpdateItemText(e.target.value)) }} value={updateItemsText} />
            <button className="update-new-btn" type="submit">Update</button>
        </form>
    )

    return (
        <div className='App'>
            <form className='form' onSubmit={e => addItem(e)}>
                <input type="text" placeholder='Add Todo Item' onChange={e => { dispatch(setItemText(e.target.value)) }}></input>
                <button type='submit'>Add</button>
            </form>
        {
                todoData.map((item: any) => (
                    <div className='todo-listItems'>

                        <div className="todo-item">
                            {
                                isUpdating === item._id
                                    ? renderUpdateForm()
                                    : <>
                                        <p className="item-content">{item.item}</p>
                                        <button className="update-item" onClick={() => { dispatch(setIsUpdating(item._id)) }}>Update</button>
                                        <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                                    </>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ToDoList;
