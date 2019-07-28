import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@vkontakte/vkui/dist/vkui.css';
import {View, Panel, PanelHeader, FormLayout, Input, FormLayoutGroup, Select, Radio, Textarea, Checkbox, Link, Button} from "@vkontakte/vkui";

const types = [
  {
    name: "Количество задержанных",
    key: "z",
    inputs: [
      <Input
          type="text"
          top="Количество задержанных"
          placeholder="Количество задержанных"
          name="value"
      />
    ]
  },
  {
    name: "Количество пострадавших",
    key: "p_chely",
    inputs: [
      <Input
          type="text"
          top="Количество пострадавших"
          placeholder="Количество пострадавших"
          name="value"
      />
    ]
  },
  {
    name: "Количество пострадавших (полиция)",
    key: "p_mysor",
    inputs: [
      <Input
          type="text"
          top="Количество пострадавших (полиция)"
          placeholder="Количество пострадавших (полиция)"
          name="value"
      />
    ]
  },
  {
    name: "Всего участников",
    key: "total",
    inputs: [
      <Input
          type="text"
          top="Всего участников"
          placeholder="Всего участников"
          name="value"
      />
    ]
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  onSubmit() {
    let key = types[this.state.type].key;
    if(key !== "news"){
      fetch("http://84.201.149.111:80/updateData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          ...this.state
        })
      });
    }
  }

  render() {
    const { email, purpose } = this.state;

    return (
        <View activePanel="new-user">
          <Panel id="new-user" theme="white">
            <PanelHeader>Регистрация</PanelHeader>
            <FormLayout>
              <Input
                  type="text"
                  top="Токен"
                  placeholder="Токен"
                  name="token"
              />
              <Select name="type" value={this.state.type} onChange={this.onChange} top="Данные" placeholder="Данные">
                {types.map((item, index) => {
                  return(<option key={index} value={index}>{item.name}</option>)
                })}
              </Select>
              {this.state.type !== undefined &&
                types[this.state.type].inputs.map((Item, value) => {
                  return(Item)
                })
              }
              <Button size="xl" onClick={this.onSubmit}>Обновить информацию</Button>
            </FormLayout>
          </Panel>
        </View>
    );
  }
}

export default App;