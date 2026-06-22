(function () {
  const form = document.querySelector('.dashboard-filters');
  if (!form) {
    return;
  }

  form.addEventListener('change', (event) => {
    if (event.target.name === 'status' || event.target.name === 'brand') {
      form.submit();
    }
  });
})();
