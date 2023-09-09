import React ,{ useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import './button.css';

export default function Card(props) {
    
    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();  // for initial value of price

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true); // Set the button as clicked
        setTimeout(() => {
          setIsClicked(false); // Reset the button state after 2 seconds
        }, 100);
      };

    let options = props.options;
    let priceOption = Object.keys(options);  // "half" : "120" in this half is key so priceoption hold keys from database half/full
    
    let fooddetails = props.foodItem
    
    

    // //  default values
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");


    const handleAddCart = async () => {

        

        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }

        // if food phly sy card me exist krta hy
        if (food !== []) {

            if (food.size === size) {
                // age size same or quantity different hy to
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            // agr size same ni to direct add krna update ni krna 
            else if (food.size !== size) {
                await dispatch({ type: "ADD", name: props.foodItem.name, id: props.foodItem._id, price: finalPrice, qty: qty, size: size,img:props.foodItem.img })
               return
            }
           return
        }

        //    agr doos exist ni krta to new food add krna hhy
        await dispatch({ type: "ADD",  name: props.foodItem.name, id: props.foodItem._id, price: finalPrice, qty: qty, size: size,img:props.foodItem.img}) // ider name or img to databse sy arha but qty and price jo select ki wo ai gi
        //   console.log(data);  
        //  card ka data inspect krny ky liye 
        
    }


    let finalPrice = qty * parseInt(options[size]);


    useEffect(() => {
        setSize(priceRef.current.value)
    },[])


    function handleButtonClick() {
        handleClick(); // Call the handleClick function
        handleAddCart(); // Call the handleAddCart function
      }

    return (
        <div>
            <div>

                <div className="card mt-4 mb-4" style={{ maxHeight: "400px", width: "20rem",marginLeft:"50px " }}>
                    <img src={props.foodItem.img} className="d-block w-100 card-img-top" alt="..." style={{ height: "180px", objectFit: "fill" }} />

                    <div className="card-body" style={{ objectFit: "fill",backgroundColor:"#3e4a4f" }}>
                        <h5 className="card-title">{props.foodItem.name}</h5>

                        <div className='container w-100'>
                            <select style={{color:"#afa8b5",backgroundColor:"#323536"}} className='m-2 h-100   rounded'  onChange={(e) => setQty(e.target.value)}>
                            {/* jo qty hogi wo select hogi sirf */}
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>

                            <select style={{color:"#afa8b5",backgroundColor:"#323536"}} className='m-2 h-100  rounded' onChange={(e) => setSize(e.target.value)}  ref={priceRef}  >
                           

                                {
                                    priceOption.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                Rs{finalPrice}/-
                            </div>
                        </div>
                        <hr></hr>
                        <button
      className={`my-button ${isClicked ? 'clicked' : ''}`}
      onClick={handleButtonClick}
    >
      Add to cart
    </button>
                        {/* <button style={buttondefault} className='btn  justify-center ms-2 ' onClick={handleAddCart}  >Add to cart  </button> */}
                        {/*  */}
                    </div>
                </div>
            </div>
        </div>

    )
}


const buttondefault = {color:"#afa8b5",backgroundColor:"#323536"};

const buttondeclick = {color:"#afa8b5",backgroundColor:"#323536"}

