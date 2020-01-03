import React from 'react'
import Todo from './Todo'
import 'antd/dist/antd.css'

function App() {
  return (
  <div>
    <div style={{display: 'flex', justifyContent: 'center', border:'0px dashed red'}}>
      <h2>TodoList for 2020</h2>
    </div>
    <div>
      <Todo />
    </div>
  </div>
  );
}

export default App;
