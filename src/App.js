import React from 'react';
import './App.css';

function App() {

  let expenses = require('./expenses.json'); 

  const [result, setResult] = React.useState(null);
  const [month, setMonth] = React.useState('00');
  const [year, setYear] = React.useState('0000');
  const [selected, setSelected] = React.useState(null);
  const [total, setTotal] = React.useState(0);

  function convertDate(date) {
    const shortDate = date.slice(0,10);
    const dateBR = shortDate.replaceAll('-', '/');
    const dateFormat = dateBR.split('/').reverse().join('/');

    return dateFormat;
  }

  function convertCurrency(value) {
    let amount = value.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return amount;
  }

  function calculateTotal(arr) {
    let totalPeriodAmount = arr.reduce((acc, item) => ({value: acc.value + item.value}));
    setTotal(totalPeriodAmount);;;
  }

  function handleSubmit(e) {
    e.preventDefault();

    let searchResult = null;

    setSelected(null);
    setResult(null);

    if (expenses.length === 0) {
      alert('Nenhum dado encontrado');
      return false;
    }

    if (year === '0000' || month === '00') {
      alert('Selecione o ano e o mês da consulta!');
      return false;
    } else {
      searchResult = expenses.filter(item => item.date.includes(`${year}-${month}`));
    }

    if (!searchResult || searchResult.length === 0) {
      alert('Não há despesas para o período!');
      return false;
    } else {
      setResult(searchResult);
      calculateTotal(searchResult);
    }
  } 

  return (
    <div className="App">
      <div className="top">
        <div className="container">
          <form id="consult" onSubmit={handleSubmit}>
            <select
              name="month"
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="00">Mês</option>
              <option value="01">Janeiro</option>
              <option value="02">Fevereiro</option>
              <option value="03">Março</option>
              <option value="04">Abril</option>
              <option value="05">Maio</option>
              <option value="06">Junho</option>
              <option value="07">Julho</option>
              <option value="08">Agosto</option>
              <option value="09">Setembro</option>
              <option value="10">Outubro</option>
              <option value="11">Novembro</option>
              <option value="12">Dezembro</option>
            </select>

            <select
              name="year"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="0000">Ano</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>

            <button type="submit" className="btn">Ver despesas</button>
          </form>
        </div>
      </div>

      <div className="content">
        <div className="container">

          {selected && (
            <div className="selected-item">
              <div className="title">Despesa selecionada</div>
              <div className="description">
                {convertDate(selected.date)} - {selected.description} no valor de {convertCurrency(selected.value)}
              </div>
            </div>
          )}
          
          {result && result.length > 0 && (
            <table className="result">
              <thead>
                <tr>
                  <th className="only-lg">Data</th>
                  <th>Despesa</th>
                  <th>Valor</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
                {result.map(({ _id, date, description, value }) => (
                  <tr key={_id}>
                    <td className="only-lg">{convertDate(date)}</td>
                    <td>{description}</td>
                    <td>{convertCurrency(value)}</td>
                    <td>
                      <button
                        className="btn-select"
                        onClick={() => setSelected({ _id, date, description, value })}
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">
                    <strong>Total do período</strong>
                  </td>
                  <td>
                    <strong>{convertCurrency(total.value)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          )}

        </div>
      </div>

      <button type="submit" className="btn footer-mobile">Ver despesas</button>
    </div>
  );
}

export default App;
