document.getElementById('investment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calcularInvestimento();
  });
  
  function calcularInvestimento() {
    var investimentoMensal = parseFloat(document.getElementById('monthly-investment').value);
    var entradaInicial = parseFloat(document.getElementById('initial-investment').value);
    var duracaoInvestimento = parseInt(document.getElementById('investment-duration').value);
    var totalMeses = duracaoInvestimento * 12;
  
    var tabelaInvestimento = document.getElementById('investment-table').getElementsByTagName('tbody')[0];
    tabelaInvestimento.innerHTML = '';
  
    var dataAtual = new Date();
    var mesAtual = dataAtual.getMonth() + 1;
    var anoAtual = dataAtual.getFullYear();
  
    var totalInvestido = entradaInicial;
    var totalAnterior = 0;
    var rendimentoAnterior = 0;
  
    for (var i = 0; i < totalMeses; i++) {
      var data = new Date(anoAtual, mesAtual - 1, 1);
      mesAtual++;
      if (mesAtual > 12) {
        mesAtual = 1;
        anoAtual++;
      }
  
      var novaLinha = tabelaInvestimento.insertRow();
      var celulaData = novaLinha.insertCell();
      celulaData.textContent = formatarData(data);
  
      var celulaInvestimento = novaLinha.insertCell();
      if (i === 0) {
        celulaInvestimento.textContent = formatarMoeda(investimentoMensal + entradaInicial);
      } else {
        celulaInvestimento.textContent = formatarMoeda(investimentoMensal);
      }
  
      var celulaTotalMensal = novaLinha.insertCell();
      var totalMensal;
      if (i === 0) {
        totalMensal = ((((investimentoMensal + entradaInicial) * 0.00021) * 30) + investimentoMensal + entradaInicial);
      } else {
        totalMensal = ((((totalAnterior + investimentoMensal) * 0.00021) * 30) + totalAnterior + investimentoMensal);
      }
      celulaTotalMensal.textContent = formatarMoeda(totalMensal);
      totalAnterior = totalMensal;
  
      var celulaRendimento = novaLinha.insertCell();
      if (i === 0) {
        celulaRendimento.textContent = formatarMoeda(totalMensal - (investimentoMensal + entradaInicial));
      } else {
        celulaRendimento.textContent = formatarMoeda(((totalMensal - (totalInvestido + investimentoMensal)) - rendimentoAnterior) - investimentoMensal);
      }
      totalInvestido += investimentoMensal;
      rendimentoAnterior = totalMensal - (totalInvestido + investimentoMensal);
    }
  
    var elementoInvestido = document.getElementById('total-invested');
    elementoInvestido.textContent = 'Total investido: ' + formatarMoeda(somarInvestimentos());
  
    var elementoRendimento = document.getElementById('total-earnings');
    elementoRendimento.textContent = 'Total de rendimento: ' + formatarMoeda(somarRendimentos());
  
    document.getElementById('results').classList.remove('hidden');
  }
  
  function formatarData(data) {
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return mes.toString().padStart(2, '0') + '/' + ano;
  }
  
  function formatarMoeda(valor) {
    return 'R$ ' + valor.toFixed(2);
  }
  
  function somarInvestimentos() {
    var celulasInvestimento = document.getElementById('investment-table').getElementsByTagName('td');
    var totalInvestimentos = 0;
    for (var i = 1; i < celulasInvestimento.length; i += 4) {
      totalInvestimentos += parseFloat(celulasInvestimento[i].textContent.substring(3));
    }
    return totalInvestimentos;
  }
  
  function somarRendimentos() {
    var celulasRendimento = document.getElementById('investment-table').getElementsByTagName('td');
    var rendimentos = 0;
    for (var i = 3; i < celulasRendimento.length; i += 4) {
      rendimentos += parseFloat(celulasRendimento[i].textContent.substring(3));
    }
    return rendimentos;
  }
