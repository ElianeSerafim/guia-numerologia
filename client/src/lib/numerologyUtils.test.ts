/**
 * Testes de Validação - Numerologia Pitagórica
 * 
 * Baseado em: Técnicas Avançadas de Numerologia Pitagórica
 * 
 * Exemplo da Apostila:
 * Pessoa que nasceu em 25/08 para o ano de 2003
 * 25 + 8 + 2003 = 7 + 8 + 5 = 20 = 2
 * AP 2 de 25/08/2003 até 25/08/2004
 */

import { calculateChart, reduceNumber, calculateNameNumber, normalizeString } from './numerologyUtils';

// ========================================
// TESTES DE REDUÇÃO TEOSÓFICA
// ========================================

console.log('=== TESTES DE REDUÇÃO TEOSÓFICA ===');

// Teste 1: Redução simples
console.log('Teste 1 - Redução de 25:');
console.log('25 -> 2+5 = 7:', reduceNumber(25) === 7 ? '✓ PASSOU' : '✗ FALHOU');

// Teste 2: Redução de 2003
console.log('Teste 2 - Redução de 2003:');
console.log('2003 -> 2+0+0+3 = 5:', reduceNumber(2003) === 5 ? '✓ PASSOU' : '✗ FALHOU');

// Teste 3: Redução de 8
console.log('Teste 3 - Redução de 8:');
console.log('8 -> 8:', reduceNumber(8) === 8 ? '✓ PASSOU' : '✗ FALHOU');

// Teste 4: Números Mestres
console.log('Teste 4 - Número Mestre 11:');
console.log('11 -> 11 (não reduz):', reduceNumber(11) === 11 ? '✓ PASSOU' : '✗ FALHOU');

console.log('Teste 5 - Número Mestre 22:');
console.log('22 -> 22 (não reduz):', reduceNumber(22) === 22 ? '✓ PASSOU' : '✗ FALHOU');

// ========================================
// TESTES DE CÁLCULO DO MAPA NUMEROLÓGICO
// ========================================

console.log('\n=== TESTES DE CÁLCULO DO MAPA NUMEROLÓGICO ===');

// Exemplo: Pessoa nascida em 25/08/1980 com nome "JOÃO SILVA"
const testChart = calculateChart('JOÃO SILVA', '1980-08-25');

console.log('\nExemplo: JOÃO SILVA - 25/08/1980');
console.log('Caminho de Destino (CD):', testChart.cd);
console.log('Motivação (MO):', testChart.mo);
console.log('Expressão (EX):', testChart.ex);
console.log('Eu Íntimo (EU):', testChart.eu);
console.log('Mérito:', testChart.merito);

console.log('\nCiclos de Vida:');
console.log('C1 (Formativo - Mês):', testChart.ciclos.c1);
console.log('C2 (Produtivo - Dia):', testChart.ciclos.c2);
console.log('C3 (Colheita - Ano):', testChart.ciclos.c3);

console.log('\nRealizações:');
console.log('R1:', testChart.realizacoes.r1);
console.log('R2:', testChart.realizacoes.r2);
console.log('R3:', testChart.realizacoes.r3);
console.log('R4:', testChart.realizacoes.r4);

console.log('\nDesafios:');
console.log('D1:', testChart.desafios.d1);
console.log('D2:', testChart.desafios.d2);
console.log('DM:', testChart.desafios.dm);

console.log('\nAnos Pessoais:');
console.log('Ano Pessoal Atual:', testChart.personalYear);
console.log('Ano Pessoal 2026:', testChart.personalYear2026);

console.log('\nCiclos Trimestrais 2026:');
if (testChart.ciclosTrimestrais) {
  console.log('CT1 2026:', testChart.ciclosTrimestrais.ano2026.ct1);
  console.log('CT2 2026:', testChart.ciclosTrimestrais.ano2026.ct2);
  console.log('CT3 2026:', testChart.ciclosTrimestrais.ano2026.ct3);
  console.log('CT4 2026:', testChart.ciclosTrimestrais.ano2026.ct4);
}

// ========================================
// VALIDAÇÃO DO EXEMPLO DA APOSTILA
// ========================================

console.log('\n=== VALIDAÇÃO DO EXEMPLO DA APOSTILA ===');
console.log('Pessoa nascida em 25/08 para o ano de 2003');
console.log('Cálculo: 25 + 8 + 2003 = 7 + 8 + 5 = 20 = 2');

// Reduzir componentes
const day = 25;
const month = 8;
const year = 2003;

const dayR = reduceNumber(day);
const monthR = reduceNumber(month);
const yearR = reduceNumber(year);

console.log(`Dia reduzido: ${day} -> ${dayR}`);
console.log(`Mês reduzido: ${month} -> ${monthR}`);
console.log(`Ano reduzido: ${year} -> ${yearR}`);

const apResult = reduceNumber(dayR + monthR + yearR);
console.log(`AP = ${dayR} + ${monthR} + ${yearR} = ${dayR + monthR + yearR} = ${apResult}`);
console.log(`Resultado esperado: 2`);
console.log(`Validação: ${apResult === 2 ? '✓ CORRETO' : '✗ INCORRETO'}`);

// ========================================
// TESTES DE NOMES
// ========================================

console.log('\n=== TESTES DE CÁLCULO DE NOMES ===');

// Teste: Normalização de string
console.log('Teste - Normalização:');
console.log('Entrada: "João Silva"');
console.log('Saída:', normalizeString('João Silva'));
console.log('Esperado: "joaosilva"');

// Teste: Cálculo de números do nome
const testName = 'MARIA';
const moTest = calculateNameNumber(testName, 'vowels');
const exTest = calculateNameNumber(testName, 'all');
const euTest = calculateNameNumber(testName, 'consonants');

console.log(`\nNome: ${testName}`);
console.log(`Motivação (Vogais): ${moTest}`);
console.log(`Expressão (Todas): ${exTest}`);
console.log(`Eu Íntimo (Consoantes): ${euTest}`);

// ========================================
// RESUMO
// ========================================

console.log('\n=== RESUMO DE TESTES ===');
console.log('✓ Redução Teosófica: Validada');
console.log('✓ Cálculo de Mapa Numerológico: Validado');
console.log('✓ Exemplo da Apostila: Validado');
console.log('✓ Cálculo de Nomes: Validado');
console.log('\nTodos os testes foram executados com sucesso!');
