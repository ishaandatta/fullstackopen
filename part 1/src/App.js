


import { useState } from 'react';


const Button = ({val, setVal, type}) =>{
  return (
    <button onClick={() => {setVal(val+1)}}> {type} </button>

  );
}

const StatisticLine = ({type, val}) => {

  return(
    <p>{type} {val}</p>
  )

}

const Stats = ({good, neutral, bad}) => {

  if (good>0 || bad>0 || neutral>0) {
    let all = good+bad+neutral;
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine type={"good"} val={good} />
        <StatisticLine type={"neutral"} val={neutral}/>
        <StatisticLine type={"bad"} val={bad}/>
        <StatisticLine type={"all"} val={all}/>
        <StatisticLine type={"average"} val={(good-bad)/ all} />
        <StatisticLine type={"positive"} val={(good/all)*100+'%'} />
        {/* <p>good {good} </p>
        <p>neutral {neutral}</p>
        <p>bad {bad} </p>
        <p>all {bad+good+neutral} </p>
        <p>average {((-1*bad)+good)/(bad+good+neutral)} </p>
        <p>positive {((good)/(bad+good+neutral))*100}% </p> */}
      </div>
    );
  }
  else{
    return (
      <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </div>
      );
  }

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button val={good} setVal={setGood} type="good"/>
      <Button val={neutral} setVal={setNeutral} type="neutral"/>
      <Button val={bad} setVal={setBad} type="bad"/>
      {/* <button onClick={() => {setGood(good+1)}}>good</button> */}
      {/* <button onClick={() => {setNeutral(neutral+1)}}>neutral</button>
      <button onClick={() => {setBad(bad+1)}}>bad</button> */}

      <Stats good={good} bad={bad} neutral={neutral}/>

    </div>
  );
}

export default App;
