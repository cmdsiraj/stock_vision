import React from 'react';
import ReactDOM from 'react-dom';

function StockRow(props){
    console.log('hellooo')
    console.log(props)
    let td_class="px-6 py-2"
    if((props.value-props.prev).toFixed(2)>0){
        td_class+=" text-green-500"
    }
    else{
        td_class+=" text-red-500"
    }
    // (props.value-props.prev).toFixed(2)>0 ? td_class+=" text-green-500" : td_class+=" text-red-500"
    
return(
<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th  class="px-3 py-2 font-medium text-gray-900 whitespace dark:text-white">
                    {props.name}
                </th>
                <td class="px-6 py-2">
                    {(props.value).toFixed(2)}
                </td>
                <td class={td_class}>
                    {(props.value-props.prev).toFixed(2)}
                </td>
                <td class={td_class}>
                   {(((props.value-props.prev)/props.prev)*100).toFixed(2)}%
                </td>
                <td class="px-6 py-2">
                    {(props.open).toFixed(2)}
                </td>
                <td class="px-6 py-2">
                    {(props.high).toFixed(2)}
                </td>
                <td class="px-6 py-2">
                {(props.low).toFixed(2)}
                </td>
                <td class="px-6 py-2">
                {(props.prev).toFixed(2)}
                </td>
            </tr>
    );
    
}
export default StockRow;