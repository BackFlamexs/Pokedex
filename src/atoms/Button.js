
export default function Button({text='OK', onClick=null, classes='' } = {}) {
  // Cria um novo elemento <button> 
  const btn = document.createElement('button');
  
  // Define a classe CSS do botão (sempre 'btn' + classes adicionais)
  btn.className = 'btn ' + classes;
  
  // Define o texto exibido dentro do botão
  btn.textContent = text;
  
  if(onClick) btn.addEventListener('click', onClick);
  
  // Retorna o botão pronto para ser adicionado ao DOM
  return btn;
}
