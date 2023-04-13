import React from "react";

function DisplayImage(){
    return(
        <div>
            <figure class="max-w-lg">
                <img class="h-auto max-w-full rounded-lg" src="../images/ARIMA.png" alt="stock_graph" />
                 <figcaption class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image caption</figcaption>
            </figure>
        </div>
    );
}
export default DisplayImage;