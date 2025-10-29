// ============================================================================
// COMPONENTE ATÔMICO - Input.js
// ============================================================================
// Um campo de entrada de texto é um componente básico (átomo) da interface
// Recebe propriedades e retorna um elemento <input> pronto para usar
// ============================================================================

// ============================================================================
// FUNÇÃO: Input
// Cria e retorna um elemento <input> com propriedades customizáveis
// Parâmetros (objeto desestruturado):
//   - placeholder: texto de dica dentro do input (padrão string vazia)
//   - onInput: função a executar quando o usuário digita (padrão null)
//   - attrs: objeto com atributos HTML adicionais (padrão {})
// Retorna: elemento <input> do DOM
// ============================================================================
export default function Input({placeholder='', onInput=null, attrs={} } = {}) {
  // Cria um novo elemento <input>
  const input = document.createElement('input');
  
  // Define a classe CSS para estilização
  input.className = 'input';
  
  // Define o placeholder (texto de dica que aparece quando vazio)
  input.placeholder = placeholder;
  
  // Adiciona atributos HTML adicionais (ex: type, id, data-*)
  // Object.entries() converte o objeto em pares [chave, valor]
  // Para cada par, define o atributo no elemento
  Object.entries(attrs).forEach(([k,v])=> input.setAttribute(k,v));
  
  // Se uma função onInput foi fornecida, adiciona um listener de evento
  // O evento 'input' dispara sempre que o usuário digita algo
  if(onInput) input.addEventListener('input', onInput);
  
  // Retorna o input pronto para ser adicionado ao DOM
  return input;
}
