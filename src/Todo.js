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
    const item = { job : this.state.inputText }

  /* VVV Error Bad request 400 HTTP */
    await fetch(`${api}/items`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(item)
    })

  /* ^^^ Error Bad request 400 HTTP */

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

  delClick = i => () => {
    this.setState({
      items: this.state.items.filter( (v,idx) => i !== idx)
    })
  }

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
                    <Row key={i} type='flex' justify='start'>
                      <Col span={18} style={{ padding: "5px" ,border: "1px dashed blue" }}> {v.job} </Col>
                      <Col span={6} style={{ padding: "5px" ,border: "1px dashed blue" }}>
                        <Button type="dashed" onClick={this.delClick(i)}>
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
