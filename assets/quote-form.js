/* Quote form (home page and every inner page).
   Posts straight to the Eye To Ad lead server (clients.eyetoad.com/lead/send.php), which saves the
   lead first and then emails the alert. No third-party form service is used.
   Spam guards: honeypot (_honey), 3 second minimum on page, math check, content filter.
   Success is shown only when the lead server answers {ok:true}; anything else shows the phone number.
   Details travel in the POST body only, never in the URL. */
(function () {
  'use strict';
  var form = document.getElementById('quoteForm');
  if (!form) return;
  var LEAD = 'https://clients.eyetoad.com/lead/send.php', PHONE = '1-888-779-2284';
  var SITE = location.hostname.replace(/^www\./, '');
  var statusEl = document.getElementById('formStatus'), submitBtn = document.getElementById('submitBtn');
  var mq = document.getElementById('mathQuestion'), loadTime = Date.now(), lastSubmit = 0, count = 0, a, b, correct;
  function newMath() { a = Math.floor(Math.random() * 9) + 1; b = Math.floor(Math.random() * 9) + 1; correct = a + b; if (mq) mq.textContent = 'Spam check: what is ' + a + ' + ' + b + '?'; }
  newMath();
  var SPAM = [/\bviagra\b/i, /\bcialis\b/i, /\bcasino\b/i, /\bslot\b.*\bwin\b/i, /https?:\/\//i, /\[url\]/i, /\bSEO\b.*\bservice\b/i, /\bbacklink\b/i, /\bwork from home\b/i, /\bmake money\b/i];
  var ok = '#166534', bad = '#b91c1c';
  function say(color, msg) { statusEl.style.color = color; statusEl.textContent = msg; }
  var phone = document.getElementById('user_phone');
  if (phone) phone.addEventListener('blur', function () { var d = this.value.replace(/\D/g, ''); if (d.length === 10) this.value = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6); });
  function v(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function post(fd) {
    return fetch(LEAD, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' }, credentials: 'omit', referrerPolicy: 'strict-origin-when-cross-origin' })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) {
          if (r.ok && j && j.ok) return j;
          throw new Error('lead-server ' + r.status);
        });
      });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var now = Date.now(); statusEl.textContent = '';
    var hp = form.querySelector('input[name="_honey"]');
    if ((hp && hp.value.trim()) || v('hp_company')) { say(ok, 'Thank you. Your request was sent.'); form.reset(); return; }
    if (now - loadTime < 3000) return say(bad, 'Please review your information and try again.');
    if (now - lastSubmit < 60000 && count >= 2) return say(bad, 'Too many requests. Please wait a moment, or call ' + PHONE + '.');
    var name = v('user_name'), ph = v('user_phone'), zip = v('user_zip'), email = v('user_email'), msg = v('user_message');
    if (!name || name.length < 2 || /^\d+$/.test(name) || /^(.)\1{4,}/.test(name)) { document.getElementById('user_name').focus(); return say(bad, 'Please enter your full name.'); }
    if (ph.replace(/\D/g, '').length < 10) { phone.focus(); return say(bad, 'Please enter a valid phone number.'); }
    if (!/^\d{5}(-\d{4})?$/.test(zip)) { document.getElementById('user_zip').focus(); return say(bad, 'Please enter a valid 5-digit ZIP code.'); }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('user_email').focus(); return say(bad, 'Please enter a valid email address or leave it blank.'); }
    if (parseInt(v('mathAnswer'), 10) !== correct) { document.getElementById('mathAnswer').focus(); return say(bad, 'Please check the answer to the spam-check question.'); }
    for (var i = 0; i < SPAM.length; i++) { if (SPAM[i].test(msg) || SPAM[i].test(name)) { say(ok, 'Thank you. Your request was sent.'); form.reset(); return; } }
    var fd = new FormData(form);
    fd.delete('_honey'); fd.delete('captcha_answer'); fd.delete('_honey_company');
    fd.append('site', SITE);
    fd.append('page', location.pathname.slice(0, 300));
    fd.append('_t', String(loadTime));
    fd.append('_subject', 'New lead - ' + SITE);
    try {
      var q = new URLSearchParams(location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'].forEach(function (k) { var x = q.get(k); if (x) fd.append('lead_' + k, x.slice(0, 120)); });
      var ref = document.referrer && document.referrer.indexOf(location.host) === -1 ? document.referrer.slice(0, 200) : '';
      if (ref) fd.append('lead_referrer', ref);
    } catch (err) { /* ignore */ }
    fd.append('lead_device', window.innerWidth < 760 ? 'phone' : 'desktop');
    submitBtn.disabled = true; say('#075985', 'Sending...');
    // One retry, so a brief network blip does not lose a lead.
    post(fd).catch(function () { return new Promise(function (res) { setTimeout(res, 1200); }).then(function () { return post(fd); }); })
      .then(function () {
        lastSubmit = Date.now(); count++;
        say(ok, 'Thank you. Your request was sent. A Denver specialist will contact you, usually within one business day.');
        form.reset(); newMath();
        if (window.gtag) { try { window.gtag('event', 'generate_lead', { form_id: form.id }); } catch (err) { /* ignore */ } }
      })
      .catch(function () { say(bad, 'Sorry, that did not go through. Please call ' + PHONE + ' and we will help you by phone.'); })
      .then(function () { submitBtn.disabled = false; });
  });
})();
