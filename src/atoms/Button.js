export default function Button({text='OK', onClick=null, classes='' } = {}){
  const btn = document.createElement('button');
  btn.className = 'btn ' + classes;
  btn.textContent = text;
  if(onClick) btn.addEventListener('click', onClick);
  return btn;
}
