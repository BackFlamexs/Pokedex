export default function Input({placeholder='', onInput=null, attrs={} } = {}){
  const input = document.createElement('input');
  input.className = 'input';
  input.placeholder = placeholder;
  Object.entries(attrs).forEach(([k,v])=> input.setAttribute(k,v));
  if(onInput) input.addEventListener('input', onInput);
  return input;
}
