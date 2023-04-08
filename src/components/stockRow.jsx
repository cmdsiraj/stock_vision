import React from 'react';

function StockRow(props){
    console.log('hellooo')
    console.log(props)
    return(

<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {props.name}
                </th>
                <td class="px-6 py-4">
                    {props.value}
                </td>
                <td class="px-6 py-4">
                    {props.open}
                </td>
                <td class="px-6 py-4">
                    {props.high}
                </td>
                <td class="px-6 py-4">
                {props.low}
                </td>
                <td class="px-6 py-4">
                {props.prev}
                </td>
            </tr>
    );
}
export default StockRow;