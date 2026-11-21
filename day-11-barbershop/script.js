// The Sharp Cut Barbershop — Day 11
(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { mainNav.classList.remove('open'); });
  });

  // Service filters
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.service-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-category') || '').split(' ');
        var show = filter === 'all' || cats.indexOf(filter) !== -1;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // Booking form
  var bookingForm = document.getElementById('bookingForm');
  var bookingMsg = document.getElementById('bookingMsg');
  var serviceSelect = document.getElementById('bkService');
  var dateInput = document.getElementById('bkDate');
  var today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.value = today;

  function setMsg(el, text, ok) {
    el.textContent = text;
    el.className = 'form-note ' + (ok ? 'success' : 'error');
  }

  // "Book this" buttons pre-fill the booking form and scroll to it
  document.querySelectorAll('.book-service').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.service-card');
      var service = card.getAttribute('data-service');
      var price = card.getAttribute('data-price');
      var target = service + ' — $' + price;
      for (var i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text === target) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('bkName').focus({ preventScroll: true });
    });
  });

  // Gallery tiles book the matching service too
  document.querySelectorAll('.gallery-item').forEach(function (tile) {
    tile.addEventListener('click', function () {
      var service = tile.getAttribute('data-service');
      for (var i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.indexOf(service) === 0) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
  });

  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('bkName').value.trim();
    var phone = document.getElementById('bkPhone').value.trim();
    var date = dateInput.value;
    var time = document.getElementById('bkTime').value;
    var barber = document.getElementById('bkBarber').value;

    if (!name || !phone || !date) {
      setMsg(bookingMsg, 'Please fill in your name, phone and a date.', false);
      return;
    }
    if (phone.replace(/\D/g, '').length < 7) {
      setMsg(bookingMsg, 'That phone number looks too short — please check it.', false);
      return;
    }
    var dateLabel = new Date(date + 'T12:00:00').toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric'
    });
    setMsg(bookingMsg, 'Thanks, ' + name + '! Your ' + serviceSelect.value.split(' — ')[0] +
      ' with ' + barber + ' is requested for ' + dateLabel + ' at ' + time +
      '. We will text ' + phone + ' to confirm.', true);
    bookingForm.reset();
    dateInput.value = today;
  });

  // Newsletter form
  var newsletterForm = document.getElementById('newsletterForm');
  var nlMsg = document.getElementById('nlMsg');
  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('nlEmail').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg(nlMsg, 'Please enter a valid email address.', false);
      return;
    }
    setMsg(nlMsg, 'Welcome aboard! Your 10% off code is on its way to ' + email + '.', true);
    newsletterForm.reset();
  });
})();
