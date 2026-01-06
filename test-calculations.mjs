// Teste simples dos cálculos numerológicos
import { calculateChart, reduceNumber } from './client/src/lib/numerologyUtils.ts';

console.log('=== TESTE DE CÁLCULOS NUMEROLÓGICOS ===\n');

// Exemplo: João Silva Santos - 25/08/1990
const name = 'João Silva Santos';
const birthDate = '1990-08-25';

try {
  const chart = calculateChart(name, birthDate);
  
  console.log(`Nome: ${name}`);
  console.log(`Data de Nascimento: ${birthDate}\n`);
  
  console.log('NÚMEROS PRINCIPAIS:');
  console.log(`  Caminho de Destino (CD): ${chart.cd}`);
  console.log(`  Motivação (MO): ${chart.mo}`);
  console.log(`  Expressão (EX): ${chart.ex}`);
  console.log(`  Eu Íntimo (EU): ${chart.eu}`);
  console.log(`  Mérito (ME): ${chart.merito}\n`);
  
  console.log('DESAFIOS:');
  console.log(`  D1 (|Dia - Mês|): ${chart.desafios.d1}`);
  console.log(`  D2 (|Dia - Ano|): ${chart.desafios.d2}`);
  console.log(`  D3 (|Mês - Ano|): ${chart.desafios.d3}`);
  console.log(`  DM (|D1 - D3|): ${chart.desafios.dm}\n`);
  
  console.log('CICLOS:');
  console.log(`  C1 (Formativo): ${chart.ciclos.c1}`);
  console.log(`  C2 (Produtivo): ${chart.ciclos.c2}`);
  console.log(`  C3 (Colheita): ${chart.ciclos.c3}\n`);
  
  console.log('REALIZAÇÕES:');
  console.log(`  R1: ${chart.realizacoes.r1}`);
  console.log(`  R2: ${chart.realizacoes.r2}`);
  console.log(`  R3: ${chart.realizacoes.r3}`);
  console.log(`  R4: ${chart.realizacoes.r4}\n`);
  
  console.log('✓ Cálculos completados com sucesso!');
} catch (error) {
  console.error('✗ Erro ao calcular:', error.message);
}
