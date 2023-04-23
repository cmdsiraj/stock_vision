import { waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

function StockRow(props){
    // console.log('hellooo')
    // console.log(props)
    let td_class="text-center"
    let td_class1="text-center"
    if((props.value-props.prev).toFixed(2)>0){
        td_class1+=" text-green-500"
    }
    else{
        td_class1+=" text-red-500"
    }

    // (props.value-props.prev).toFixed(2)>0 ? td_class+=" text-green-500" : td_class+=" text-red-500"
    
return(
<tr class=" bg-gray-900 border-gray-700 transform hover:bg-gray-800">
                <th  class={"px-3 py-2 font-medium text-gray-900 whitespace dark:text-white"}>
                    {props.name}
                </th>
                <td class={td_class}>
                    {(props.value).toFixed(2)}
                </td>
                <td class={td_class1}>
                    {(props.value-props.prev).toFixed(2)}
                </td>
                <td class={td_class1}>
                   {(((props.value-props.prev)/props.prev)*100).toFixed(2)}%
                </td>
                <td class={td_class}>
                    {(props.open).toFixed(2)}
                </td>
                <td class={td_class}>
                    {(props.high).toFixed(2)}
                </td>
                <td class={td_class}>
                {(props.low).toFixed(2)}
                </td>
                <td class={td_class}>
                {(props.prev).toFixed(2)}
                </td>
            </tr>
    );
    
}
export default StockRow;