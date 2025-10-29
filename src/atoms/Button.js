// ============================================================================
// COMPONENTE ATÔMICO - Button.js
// ============================================================================
// Um botão é o componente mais básico (átomo) da interface
// Recebe propriedades e retorna um elemento <button> pronto para usar
// ============================================================================

// ============================================================================
// FUNÇÃO: Button
// Cria e retorna um elemento <button> com propriedades customizáveis
// Parâmetros (objeto desestruturado):
//   - text: texto exibido no botão (padrão "OK")
//   - onClick: função a executar ao clicar (padrão null)
//   - classes: classes CSS adicionais (padrão string vazia)
// Retorna: elemento <button> do DOM
// ============================================================================
export default function Button({text='OK', onClick=null, classes='' } = {}) {
  // Cria um novo elemento <button>
  const btn = document.createElement('button');
  
  // Define a classe CSS do botão (sempre 'btn' + classes adicionais)
  // Exemplo: 'btn' ou 'btn primary'
  btn.className = 'btn ' + classes;
  
  // Define o texto exibido dentro do botão
  btn.textContent = text;
  
  // Se uma função onClick foi fornecida, adiciona um listener de clique
  // Quando o botão for clicado, a função será executada
  if(onClick) btn.addEventListener('click', onClick);
  
  // Retorna o botão pronto para ser adicionado ao DOM
  return btn;
}
