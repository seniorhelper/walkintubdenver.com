/* Contact form: same EmailJS service/template as the homepage form, same spam checks. */
(function () {
  var form = document.getElementById('quoteForm');
  if (!form) return;
  var PUBLIC_KEY = 'alWutsHLG6c3h9P2j', SERVICE_ID = 'service_usimtub', TEMPLATE_ID = 'template_5n0cskt';
  var hasEJ = !!(window.emailjs && emailjs.sendForm);
  if (hasEJ) emailjs.init({ publicKey: PUBLIC_KEY });
  var statusEl = document.getElementById('formStatus'), submitBtn = document.getElementById('submitBtn');
  var mq = document.getElementById('mathQuestion'), loadTime = Date.now(), lastSubmit = 0, count = 0, a, b, correct;
  function newMath() { a = Math.floor(Math.random() * 9) + 1; b = Math.floor(Math.random() * 9) + 1; correct = a + b; mq.textContent = 'Spam check: what is ' + a + ' + ' + b + '?'; }
  newMath();
  var SPAM = [/\bviagra\b/i, /\bcialis\b/i, /\bcasino\b/i, /\bslot\b.*\bwin\b/i, /https?:\/\//i, /\[url\]/i, /\bSEO\b.*\bservice\b/i, /\bbacklink\b/i, /\bwork from home\b/i, /\bmake money\b/i];
  function say(color, msg) { statusEl.style.color = color; statusEl.textContent = msg; }
  var ok = '#166534', bad = '#b91c1c';
  var phone = document.getElementById('user_phone');
  phone.addEventListener('blur', function () { var d = this.value.replace(/\D/g, ''); if (d.length === 10) this.value = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6); });
  function v(id) { return document.getElementById(id).value.trim(); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var now = Date.now(); statusEl.textContent = '';
    if (now - loadTime < 3000) return say(bad, 'Please review your information and try again.');
    if (now - lastSubmit < 60000 && count >= 2) return say(bad, 'Too many requests. Please wait a moment, or call 1-888-779-2284.');
    if (v('hp_website') || v('hp_company')) { say(ok, 'Received! We will follow up with your Denver pricing shortly.'); form.reset(); return; }
    var name = v('user_name'), ph = v('user_phone'), zip = v('user_zip'), email = v('user_email'), msg = v('user_message');
    if (!name || name.length < 2 || /^\d+$/.test(name) || /^(.)\1{4,}/.test(name)) { document.getElementById('user_name').focus(); return say(bad, 'Please enter your full name.'); }
    if (ph.replace(/\D/g, '').length < 10) { phone.focus(); return say(bad, 'Please enter a valid phone number.'); }
    if (!/^\d{5}(-\d{4})?$/.test(zip)) { document.getElementById('user_zip').focus(); return say(bad, 'Please enter a valid 5-digit ZIP code.'); }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('user_email').focus(); return say(bad, 'Please enter a valid email address or leave it blank.'); }
    if (parseInt(v('mathAnswer'), 10) !== correct) { document.getElementById('mathAnswer').focus(); return say(bad, 'Please check the answer to the spam-check question.'); }
    for (var i = 0; i < SPAM.length; i++) { if (SPAM[i].test(msg) || SPAM[i].test(name)) { say(ok, 'Received! We will follow up with your Denver pricing shortly.'); form.reset(); return; } }
    if (!hasEJ) return say(bad, 'The form could not load. Please call 1-888-779-2284 and we will help you right away.');
    submitBtn.disabled = true; say('#075985', 'Sending…');
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form).then(function () {
      lastSubmit = Date.now(); count++; say(ok, 'Received! We will follow up with your Denver pricing shortly.'); form.reset(); newMath(); submitBtn.disabled = false;
    }, function (err) { say(bad, 'Something went wrong. Please call 1-888-779-2284 directly.'); if (window.console) console.warn('EmailJS error', err); submitBtn.disabled = false; });
  });
})();
