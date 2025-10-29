
export default function Input({placeholder='', onInput=null, attrs={} } = {}) {
  // Cria um novo elemento <input>
  const input = document.createElement('input');
  
  // Define a classe CSS para estilização
  input.className = 'input';
  
  // Define o placeholder (texto de dica que aparece quando vazio)
  input.placeholder = placeholder;
  
  // trabalha com atributos HTML adicionais (ex: type, id, data-*)
  Object.entries(attrs).forEach(([k,v])=> input.setAttribute(k,v));
  
  // O evento 'input' dispara sempre que o usuário digita algo
  if(onInput) input.addEventListener('input', onInput);
  
  return input;
}
