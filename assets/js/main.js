(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var form = document.getElementById('application-form');
  var successEl = document.getElementById('form-success');
  if (!form) return;

  function encode(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var payload = {};
    formData.forEach(function (value, key) {
      payload[key] = value;
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(payload)
    })
      .then(function () {
        form.hidden = true;
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function () {
        form.submit();
      });
  });
})();
