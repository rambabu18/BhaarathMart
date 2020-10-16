import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveProduct, listProducts } from '../actions/ProductAction';


function ProductsScreen(props) {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [id,setId] = useState('')
    const [name, setName ] = useState('');
    const [price, setPrice ] = useState('');
    const [image, setImage ] = useState('');
    const [brand, setBrand ] = useState('');
    const [category, setCategory ] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const productlist = useSelector(state=>state.productList);
    const {loading, products, error} = productlist;
    const productsave = useSelector(state=> state.productSave);
    const {loading: loadingSave, success:successSave, error: errorSave} = productsave;
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts());
        return () => { 
            //
        }
    }, []);

    const openModal = (product) =>{
        setModalVisible(true);
        setId(product.id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);

    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
               id:id,
               name,price, image, brand, description,
               countInStock, category
            }));
    }
            
    return <div className='content content-margined' >
        <div className='product-header'>
        <h3>Products</h3>
        <button onClick={()=> openModal({})} >Create Product</button>
        </div>
        {modalVisible && 
        <div className='form'>
        <form onSubmit={submitHandler} >

            <ul className='form-container' >
                <li>
                    <h2>Create Product</h2>
                </li>
                <li>
                    {loadingSave && <div>Loading....</div>}
                    {successSave && <div>Created successfully..</div>}
                    {errorSave && <div>{errorSave} </div>}
                </li>

                <li>
                    <label htmlFor='name' > Name  </label>
                    <input type='text' name='name' id='name' value={name}  onChange={(e) => setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor='image' > Image  </label>
                    <input type='text' name='image' id='image' value={image} onChange={(e) => setImage(e.target.value)}>
                    </input>
                </li>

                <li>
                    <label htmlFor='brand' > Brand  </label>
                    <input type='text' name='brand' id='brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor='category' > Category  </label>
                    <input type='text' name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    </input>
                </li>

                <li>
                    <label htmlFor='countInStock' > CountInStock  </label>
                    <input type='text' name='countInStock' id='countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                    </input>
                </li>

                <li>
                    <label htmlFor='price' >Price</label>
                    <input type='text' name='price' id='price' value={price} onChange={(e) => setPrice(e.target.value)}>
                    </input>
                </li>

                <li>
                    <label htmlFor='description' > Description  </label>
                    <textarea  name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                </li>

                <li>
                    <button type='submit' className='button primary' >{id ? "Update": "Create"} </button>
                    <button type='button' onClick={()=>setModalVisible(false)}  className='button secondary' >Back</button>
                </li>


            </ul>
        </form>
    </div>
        }
        
        <div className='product-list' >
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(<tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>

                       <td>
                            <button onClick={()=>setModalVisible(product)} >Edit</button>
                            <button>Delete</button>
                           
                        </td>
                        
                        </tr> ))}
                </tbody>
                
            </table>
            
        </div>
    </div>
    
    
    

}
export default ProductsScreen