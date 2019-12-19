/* eslint no-eval: 0 */
// eslint-disable-next-line no-unused-vars
import React, { Component, ReactText } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native'

interface IProps {
}
interface IState {
  resultText?: string;
  calculationText?: string;
  text?: string;
  disable?: string;
}
export default class App extends Component<IProps, IState> {
  operations: string[];

  constructor (props: IProps) {
    super(props)
    this.state = {
      resultText: '',
      calculationText: ''
    }
    this.operations = ['Del', 'C', '+', '-', '*', '/']
  }

  calculateResult () {
    const text = this.state.resultText
    const lastChar = this.state.resultText.split('').pop()

    if (text.length > 1) {
      if (text.charAt(0) === '*' || text.charAt(0) === '+' || text.charAt(0) === '-' || text.charAt(0) === '/') {
        this.setState({
          calculationText: 'invalid syntax',
          resultText: ''
        })
      } else if (this.state.resultText.charAt(0) === '.') {
        this.setState({
          calculationText: 'invalid syntax',
          resultText: ''
        })
      } else if (lastChar === '*') {
        let ok = this.state.resultText
        ok = String(eval(ok.substring(0, ok.length - 1)) * eval(ok.substring(0, ok.length - 1)))
        this.setState({
          calculationText: ok
        })
      } else if (lastChar === '+') {
        let ok = this.state.resultText
        ok = String(eval(ok.substring(0, ok.length - 1)) + eval(ok.substring(0, ok.length - 1)))
        this.setState({
          calculationText: ok
        })
      } else if (lastChar === '-') {
        let ok = this.state.resultText
        ok = String(eval(ok.substring(0, ok.length - 1)) - eval(ok.substring(0, ok.length - 1)))
        this.setState({
          calculationText: ok
        })
      } else if (lastChar === '/') {
        let ok = this.state.resultText
        ok = String(eval(ok.substring(0, ok.length - 1)) / eval(ok.substring(0, ok.length - 1)))
        this.setState({
          calculationText: ok
        })
      } else {
        this.setState({
          calculationText: eval(text)
        })
      }
    } else if (text.length === 1) {
      if (text.charAt(0) === '*' || text.charAt(0) === '+' || text.charAt(0) === '-' || text.charAt(0) === '/') {
        this.setState({
          calculationText: '',
          resultText: ''
        })
      } else {
        this.setState({
          calculationText: text
        })
      }
    }
  }

  buttonPressed (text: string) {
    if (this.state.resultText.length <= 50) {
      if (text === '=') {
        return this.validate && this.calculateResult()
      }
      this.setState({
        resultText: this.state.resultText + text
      })
      switch (text) {
        case '.': {
          const lastChar = this.state.resultText.split('').pop()
          if (lastChar === '.') {
            text = text.slice(-1)
            const ok = this.state.resultText
            this.setState({
              resultText: ok.substring(0, ok.length)
            })
          }
        }
      }
      return true
    }
    this.setState({
      calculationText: '50 characters only please',
      resultText: this.state.resultText.slice(0, -1),
      disable: 'true'
    })

  }

  validate () {
    const text = this.state.resultText
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  operate (operation: string) {
    switch (operation) {
      case 'Del':
        this.setState({
          resultText: this.state.resultText.slice(0, -1)
        })
        break
      case 'C':
        this.setState({
          resultText: '',
          calculationText: ''
        })
        break
      case '+':
      case '-':
      case '*':
      case '/': {
        const lastChar : string = this.state.resultText.split('').pop()
        if (this.operations.indexOf(lastChar) > 0) return
        if (this.state.text === '') return
        this.setState({
          resultText: this.state.resultText + operation
        })
      }
    }
  }

  render () {
    const rows = []
    const nums: ReactText[][] = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']]
    let k = 10
    for (let i:string|number = 0; i < 4; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity disabled={false} key={k += k} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        )
      }
      rows.push(<View style={styles.row}>{row}</View>)
    }
    let p = 11
    const ops = []
    for (let i = 0; i < 6; i++) {
      ops.push(
        <TouchableOpacity key={p += p} style={styles.btn} onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btnText]}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 25,
    color: 'white'
  },
  btnText: {
    fontSize: 23
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  calculationText: {
    fontSize: 25,
    color: 'white'
  },
  result: {
    flex: 2,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  contOutput: {
    flex: 0.2
  },
  calculation: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: 'white'
  },
  operations: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around'
  }
})
