(function () {
  const gallery = document.getElementById('image-gallery');
  if (!gallery) {
    return;
  }

  const statusEl = document.getElementById('reorder-status');
  const reorderUrl = gallery.dataset.reorderUrl;
  const csrfToken = gallery.dataset.csrfToken;
  let draggedItem = null;
  let dragFromHandle = false;
  let dropTarget = null;

  function getItems() {
    return Array.from(gallery.querySelectorAll('.image-thumb'));
  }

  function clearDragOver() {
    getItems().forEach((el) => el.classList.remove('is-drag-over'));
  }

  function updateBadges() {
    getItems().forEach((item, index) => {
      const badge = item.querySelector('.image-badge');
      if (!badge) {
        return;
      }
      badge.classList.toggle('image-badge-hidden', index !== 0);
    });
  }

  function getOrder() {
    return getItems().map((item) => Number(item.dataset.id));
  }

  function setStatus(message, type) {
    if (!statusEl) {
      return;
    }
    statusEl.textContent = message;
    statusEl.className = 'reorder-status';
    if (type) {
      statusEl.classList.add(`reorder-status-${type}`);
    }
  }

  async function saveOrder() {
    setStatus('Guardando orden…', 'pending');

    try {
      const response = await fetch(reorderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ order: getOrder() }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar');
      }

      updateBadges();
      setStatus('Orden guardado', 'success');
      window.setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('No se pudo guardar el orden. Recarga la página.', 'error');
    }
  }

  function insertDraggedItem(target, insertAfter) {
    if (!draggedItem || !target || draggedItem === target) {
      return;
    }

    if (insertAfter) {
      target.after(draggedItem);
    } else {
      target.before(draggedItem);
    }
  }

  function handleDrop(event, target) {
    event.preventDefault();
    clearDragOver();

    if (!draggedItem || !target || draggedItem === target) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const insertAfter = event.clientX > rect.left + rect.width / 2;
    insertDraggedItem(target, insertAfter);
    saveOrder();
  }

  getItems().forEach((item) => {
    const handle = item.querySelector('.drag-handle');
    if (!handle) {
      return;
    }

    handle.addEventListener('pointerdown', () => {
      dragFromHandle = true;
    });

    item.addEventListener('dragstart', (event) => {
      if (!dragFromHandle) {
        event.preventDefault();
        return;
      }

      draggedItem = item;
      dropTarget = null;
      item.classList.add('is-dragging');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', item.dataset.id);
    });

    item.addEventListener('dragend', () => {
      dragFromHandle = false;
      draggedItem = null;
      dropTarget = null;
      item.classList.remove('is-dragging');
      clearDragOver();
    });

    item.addEventListener('dragover', (event) => {
      event.preventDefault();
      if (!draggedItem || draggedItem === item) {
        return;
      }

      event.dataTransfer.dropEffect = 'move';
      dropTarget = item;
      clearDragOver();
      item.classList.add('is-drag-over');
    });

    item.addEventListener('dragleave', (event) => {
      if (event.relatedTarget && item.contains(event.relatedTarget)) {
        return;
      }
      item.classList.remove('is-drag-over');
    });

    item.addEventListener('drop', (event) => {
      handleDrop(event, item);
    });
  });

  gallery.addEventListener('dragover', (event) => {
    event.preventDefault();
    if (!draggedItem) {
      return;
    }
    event.dataTransfer.dropEffect = 'move';
  });

  gallery.addEventListener('drop', (event) => {
    if (dropTarget) {
      return;
    }

    event.preventDefault();
    clearDragOver();

    const items = getItems();
    if (!draggedItem || items.length === 0) {
      return;
    }

    gallery.appendChild(draggedItem);
    saveOrder();
  });
})();
