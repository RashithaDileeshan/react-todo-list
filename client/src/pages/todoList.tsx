import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './todo.css'

const ToDoList = () => {
    const [itemText, setItemText] = useState('');
    const [listItems, setListItems] = useState([{_id: '', item: ''}]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState('');

    const addItem = async (e: any) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5500/api/item', { item: itemText })
            setListItems(prev => [...prev, res.data]);
            setItemText('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5500/api/items')
                setListItems(res.data);
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
            const newListItems = listItems.filter(item => item._id !== id);
            setListItems(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    //Update item
    const updateItem = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:5500/api/item/${isUpdating}`, { item: updateItemText })
            console.log(res.data)
            const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
            const updatedItem = listItems[updatedItemIndex].item = updateItemText;
            setUpdateItemText('');
            setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }
    //before updating item we need to show input field where we will create our updated item
    const renderUpdateForm = () => (
        <form className="update-form" onSubmit={(e) => { updateItem(e) }} >
            <input className="update-new-input" type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
            <button className="update-new-btn" type="submit">Update</button>
        </form>
    )

    return (
        <div className='App'>
            <form className='form' onSubmit={e => addItem(e)}>
                <input type="text" placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }}></input>
                <button type='submit'>Add</button>
            </form>
            <div className='todo-listItems'>
                {
                    listItems.map(item => (
                        <div className="todo-item">
                            {
                                isUpdating === item._id
                                    ? renderUpdateForm()
                                    : <>
                                        <p className="item-content">{item.item}</p>
                                        <button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                                        <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                                    </>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ToDoList;
