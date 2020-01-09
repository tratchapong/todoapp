import React, { Component } from "react";
import { Button, Input, Row, Col } from "antd";

const api = 'http://localhost:3001'

class Todo extends Component {
  state = {
    inputText: "",
    items: [{}]
  };

componentDidMount = async () => {
  const response = await fetch(`${api}/items`)
  const items = await response.json()
  // console.log(items)
  this.setState({items})
}


  handleChangeText = e => {
    this.setState({ inputText: e.target.value });
  };

  addClick = async (e) => {
    if (!this.state.inputText) return;
    const item = { id: new Date(), job : this.state.inputText }

    await fetch(`${api}/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(item)
    })

    console.log(item)
    const response = await fetch(`${api}/items`)
    const items = await response.json()

    this.setState({
      items,
      inputText: ""
    });
    document.querySelector("#in1").focus();
  };
  
  pressEnter = e => {
    if (e.keyCode === 13) this.addClick();
  };

  delClick = vid => async () => {
    console.log( this.state.items.find( v => v.id === vid)  )
    await fetch(`${api}/items/${vid}`, {
      method: 'DELETE',
      headers: { 'content-type' : 'application/json' }
    })
   const response = await fetch(`${api}/items`)
   const items = await response.json()

   this.setState({ items })
  };

  render() {
    return (
      <>
        <div>
          <Row type="flex" justify="center" style={{ padding: "10px" }}>
            <Col span={6} style={{ border: "0px dotted blue" }}>
              <Input
                id="in1"
                placeholder="Enter Job.."
                value={this.state.inputText}
                onChange={this.handleChangeText}
                onKeyUp={this.pressEnter}
              ></Input>
            </Col>
            <Col span={1} style={{ border: "0px dotted blue" }}>
              <Button type="primary" onClick={this.addClick}>
                Add
              </Button>
            </Col>
          </Row>
          <Row  type='flex' justify='center' style={{ padding: "10px" }}>
            <Col span={7} style={{ border: "0px dotted blue" }}>
                {this.state.items.map((v, i) => {
                  return (
                    <Row key={v.id} type='flex' justify='start'>
                      <Col span={18} style={{ padding: "5px" ,border: "1px dashed blue" }}> {v.job} </Col>
                      <Col span={6} style={{ padding: "5px" ,border: "1px dashed blue" }}>
                        <Button type="dashed" onClick={this.delClick(v.id)}>
                          Del
                        </Button>
                      </Col>
                    </Row>
                  ); 
                })}   
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Todo;
