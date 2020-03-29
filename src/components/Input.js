import React from 'react';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { bearActions } from '../redux/store'
import { formActions } from '../redux/store'
import { bindActionCreators } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const InputForm = props => {
    
    const actionsBear = bindActionCreators(bearActions, useDispatch());
    const actionsForm = bindActionCreators(formActions, useDispatch());
    const form = useSelector(state => state.form)
    const bears = useSelector(state => state.bear)
    const addBear = async () => {
        await axios.post(`http://localhost:3000/api/bears`, form)
       
        actionsBear.addBear(bears,form)
    }

    return (
        <div class="form-group row">
            <h2>Add bear</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input class="form-control" type="text" onChange={(e) => actionsForm.changeName(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>
                            <input class="form-control" type="number" onChange={(e) => actionsForm.changeWeight(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Image</td>
                        <td>
                            <input class="form-control" type="text" onChange={(e) => actionsForm.changeImg(e.target.value)} /> <br />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <div>
                            <button type="button" class="btn btn-danger"onClick={addBear}>Create</button>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InputForm