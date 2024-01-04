import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Fragment, useState } from "react";
import axios from "axios";



const ShowRecipeDetails = () => {

    const [toSow, setToShow] = useState(false)
    const [product, setProduct] = useState("")
    const [count, setCount] = useState(0)
    const { state } = useLocation();
    const userId = state.UserId;
    const Id = state.Id;
    const user = useSelector(state => state.user)
    const buy = useSelector(state => state.buyies)

    const navigate = useNavigate()
    const nav = useNavigate()
    const dispatch = useDispatch()
    const buyies = useSelector(state => state.buyies)


    const add = (product) => {
        axios.post("http://localhost:8080/api/bay", { Name: product.product, UserId: user.Id, Count: product.count })
            .then(response => {
                console.log(response.data)
                setToShow(false)
                dispatch({ type: "ADD_PRODUCT", data: response.data })
            })
            .catch(error => {
                console.error(error);
            });
    }

    return <div>
        <br></br>
        <br></br>
        <div class="card mb-34">

            <h3 class="card-header"> {state.Name}</h3>
            <img id="img1" src={state.Img}></img>
            <h3>preparation time :{state.Duration}</h3>
            <h3> Level of difficulty  :{state.Difficulty}</h3>

            <div>
                {state.Ingrident.map(i => (
                  
                    <h3>{i.Name}: {i.Count} {i.Type} <button onClick={() => (setToShow(true), setProduct(i.Name))} type="button" class="btn btn-secondary">add</button></h3>
                ))}
                {toSow &&
                    <div>
                        <input value={product} />
                        <input placeholder="כמות" onChange={(e) => setCount((Number)(e.target.value))} />
                        <button onClick={() => { add({ product, count }) }}>send</button>
                    </div>
                } 
            </div>
            <div>
                {state.Instructions.map(i => (
                    <h5>{i}</h5>
                ))}
            </div>
            <br></br>
            < button class="btn btn-primarye" onClick={() => navigate(`/addRecipe`, { state: state })} type="button" disabled={userId !== user.Id} > update recipe</button >
            <br></br>
            < button class="btn btn-primarye" onClick={() => navigate(`/deleteRecipe`, { state: Id })} type="button" disabled={userId !== user.Id} > delete recipe</button >
        </div>

    </div>
}
export default ShowRecipeDetails;