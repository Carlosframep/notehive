const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('data/subjects.json')
  .then(res => res.json())
  .then(subjects => {
    const materia = subjects.find(s => s.id === id);
    if (!materia) return;

    document.title = `${materia.nombre} — NoteHive 🐝`;
    document.getElementById('materia-emoji').textContent = materia.emoji;
    document.getElementById('materia-nombre').textContent = materia.nombre;
    document.getElementById('materia-descripcion').textContent = materia.descripcion;

    renderRecursos(materia.apuntes, 'apuntes-container');
    renderRecursos(materia.videos, 'videos-container');
    renderRecursos(materia.guias, 'guias-container');
  });

function renderRecursos(lista, containerId) {
  const container = document.getElementById(containerId);

  if (!lista || lista.length === 0) {
    container.innerHTML = '<p class="vacio">Próximamente... 🚀</p>';
    return;
  }

  lista.forEach(item => {
    const card = document.createElement('a');
    card.className = 'recurso-card';
    card.href = item.url || '#';
    card.target = '_blank';
    card.innerHTML = `
      <h4>${item.titulo}</h4>
      <p>${item.descripcion || ''}</p>
      ${item.fuente ? `<span class="fuente">📌 ${item.fuente}</span>` : ''}
    `;
    container.appendChild(card);
  });
}