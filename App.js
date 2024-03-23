import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculadora = () => {
  const [valorDisplay, setValorDisplay] = useState('0');
  const [operador, setOperador] = useState(null);
  const [primeiroValor, setPrimeiroValor] = useState(null);
  const [segundoValor, setSegundoValor] = useState(null);
  const [operadorPressionado, setOperadorPressionado] = useState(false);

  const manipularNumeroPressionado = (numero) => {
    if (valorDisplay === '0' || operadorPressionado) {
      setValorDisplay(numero);
      setOperadorPressionado(false);
    } else {
      setValorDisplay(valorDisplay + numero);
    }
  };

  const manipularOperadorPressionado = (novoOperador) => {
    if (operador !== null) {
      setOperador(novoOperador);
      setOperadorPressionado(true);
      return;
    }

    const valorEntrada = parseFloat(valorDisplay);
    if (primeiroValor === null) {
      setPrimeiroValor(valorEntrada);
    } else if (operador) {
      const valorAtual = segundoValor || valorEntrada;
      const resultado = executarOperacao(operador, primeiroValor, valorAtual);
      setValorDisplay(String(resultado));
      setPrimeiroValor(resultado);
    }

    setOperadorPressionado(true);
    setOperador(novoOperador);
  };

  const executarOperacao = (operacao, primeiroOperando, segundoOperando) => {
    switch (operacao) {
      case '+':
        return primeiroOperando + segundoOperando;
      case '-':
        return primeiroOperando - segundoOperando;
      case 'x':
        return primeiroOperando * segundoOperando;
      case '/':
        return primeiroOperando / segundoOperando;
      default:
        return segundoOperando;
    }
  };

  const manipularIgualPressionado = () => {
    if (!operador || operadorPressionado) {
      return;
    }

    const valorEntrada = parseFloat(valorDisplay);
    if (segundoValor === null) {
      setSegundoValor(valorEntrada);
    }

    const resultado = executarOperacao(operador, primeiroValor, valorEntrada);
    setValorDisplay(String(resultado));
    setPrimeiroValor(resultado);
    setOperadorPressionado(true);
    setOperador(null);
  };

  const limparTela = () => {
    setValorDisplay('0');
    setOperador(null);
    setPrimeiroValor(null);
    setSegundoValor(null);
    setOperadorPressionado(false);
  };

  const manipularDecimalPressionado = () => {
    if (!valorDisplay.includes('.')) {
      setValorDisplay(valorDisplay + '.');
      setOperadorPressionado(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{valorDisplay}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularOperadorPressionado('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularOperadorPressionado('x')}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularOperadorPressionado('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={manipularDecimalPressionado}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularNumeroPressionado('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={manipularIgualPressionado}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={limparTela}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => manipularOperadorPressionado('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  display: {
    fontSize: 48,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    width: 80,
    height: 80,
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Calculadora;
