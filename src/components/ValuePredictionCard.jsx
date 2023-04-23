import React from "react";
function ValuePredictionCard(props) {
  let text = new Array(10);
  let model = ["ARIMA", "LSTM MODEL", "LINEAR REGRESSION"];
  for (var i = 0; i < 6; i++) {
    if (i < 3) {
      text[i] = "TOMORROW'S " + props.ticker + " CLOSING PRICE BY " + model[i];
    } else {
      text[i] = model[i % 3] + " RMSE";
    }
  }
  const style_div =
    "max-w-sm p-6 text-center justify-center h-auto border border-gray-200 rounded-lg shadow bg-blue-600";
  const style_value = "mb-2 text font-bold tracking-tight text-white";
  const style_text =
    "mb-3 font-sans-italic text-sm md:text-base lg:text-base xl:text-base text-gray-300";
  // grid-cols-2 grid gap-3 content-center basis-full sm:basis-left md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3
  return (
    <div className="px-5 sm:grid-cols-2 lg:px-12 xl:px-12 py-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 overflow-x-out">
      {/* {console.log(props)} */}
      <div className={style_div}>
        <h5 className={style_value}>{props.pricePredictions.ARIMA}</h5>
        <p className={style_text}>{text[0]}</p>
      </div>
      <div className={style_div}>
        <h5 className={style_value}>{props.pricePredictions.LSTM}</h5>
        <p className={style_text}>{text[1]}</p>
      </div>
      <div className={style_div}>
        <h5 className={style_value}>{props.pricePredictions.linReg}</h5>
        <p className={style_text}>{text[2]}</p>
      </div>
      <div className={style_div}>
        <h5 className={style_value}>{props.rmse.ARIMA}</h5>
        <p className={style_text}>{text[3]}</p>
      </div>
      <div className={style_div}>
        <h5 className={style_value}>{props.rmse.LSTM}</h5>
        <p className={style_text}>{text[4]}</p>
      </div>
      <div className={style_div}>
        <h5 className={style_value}>{props.rmse.linReg}</h5>
        <p className={style_text}>{text[5]}</p>
      </div>
    </div>
  );
}
export default ValuePredictionCard;
