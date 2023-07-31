import React, { useState } from 'react'
import todo from './todo.png'
import './todo.css';
const ToDo = () => {
    const [inputData, setInputData]= useState('');
    const [Items, setItems]= useState([]);
    const [ToggleSubmit, setToggleSubmit]= useState(true);
    const [IsEditItem, setIsEditItem] = useState(null);

    const addItem =() =>{
        if(!inputData){
            alert('Please enter a valid item');
        }
        else if(inputData && !ToggleSubmit){
            setItems(
                Items.map((elem) => {
                    if(elem.id == IsEditItem){
                        return{ ...elem, name:inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else{
            const allInputData = { id:new Date().getTime().toString(), name:inputData }
            setItems([...Items, allInputData]);
            setInputData('') ;
        }
    }

    //delete item
    const deleteItem=(index) => {
        const updateditems =Items.filter((elem) => {
            index =! elem.id;
        });
        setItems(updateditems);
    }

    const editItem = (id) => {
      let newEditItem = Items.find((elem) => {
        return elem.id == id
      });
       console.log(newEditItem);
       setToggleSubmit(false);
       setInputData(newEditItem.name);
       setIsEditItem(id);
}

    //remove all
    const removeAll=()=>{
        setItems([]) ;
    }
    return(
        <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src={todo} alt='todo image logo'/>
                    <figcaption>Add Your List Here ✨</figcaption>
                </figure>
                <div className='addItems'>
                   <input type='text' placeholder='✍️ Add Items...'
                   value = {inputData}
                   onChange={(e) => setInputData(e.target.value) }
                   />
                   {
                    ToggleSubmit ?<i className="fa-solid fa-plus add-btn" title='Add Item' onClick={addItem}></i>:
                    <i className="far fa-edit add-btn" title='Edited Item' onClick={addItem}></i>
                   }
                   
                </div>
                <div className='showItems'>
                    {
                        Items.map((elem) => {
                            return (
                            <div className='eachItem'key={elem.id}>
                                <h4>{elem.name}</h4>
                                <div className='todo-btn'>
                                    <i className="far fa-edit add-btn" title='Edit Item' onClick={() => editItem(elem.id)} ></i>  
                                    <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleteItem(elem.id)} ></i>  
                                </div>
                            </div>
                            )
                        })
                    }
                </div>

                {/* clear all Button */}
                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='REMOVE ALL'><span>CHECK LIST</span></button>
                </div>
            </div>

        </div>

        </>
    )
}

export default ToDo