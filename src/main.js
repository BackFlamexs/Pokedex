// Importa o controller principal que orquestra toda a aplicação
import PokedexController from './controller/PokedexController.js';

// Aguarda o evento DOMContentLoaded: dispara quando o HTML foi completamente carregado e parseado
// Isso garante que os elementos do DOM (#app-header e #app-main) já existem antes de inicializar
document.addEventListener('DOMContentLoaded', ()=>{
  // Chama o método init() do controller para montar a interface e carregar dados iniciais
  PokedexController.init();
});