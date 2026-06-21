fetch('data/subjects.json')
  .then(res => res.json())
  .then(subjects => {
    renderSubjects(subjects);

    document.getElementById('search').addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const filtered = subjects.filter(s =>
        s.nombre.toLowerCase().includes(query) ||
        s.descripcion.toLowerCase().includes(query)
      );
      renderSubjects(filtered);
    });
  });

function renderSubjects(subjects) {
  const container = document.getElementById('subjects-container');
  container.innerHTML = '';

  subjects.forEach(subject => {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => {
      window.location.href = `materia.html?id=${subject.id}`;
    };
    card.innerHTML = `
      <div class="card-emoji">${subject.emoji}</div>
      <h2>${subject.nombre}</h2>
      <p>${subject.descripcion}</p>
      <div class="tags">
        ${subject.apuntes.length > 0 ? '<span class="tag">📄 Apuntes</span>' : ''}
        ${subject.videos.length > 0 ? '<span class="tag">🎥 Videos</span>' : ''}
        ${subject.guias.length > 0 ? '<span class="tag">📋 Guías</span>' : ''}
      </div>
    `;
    container.appendChild(card);
  });
}