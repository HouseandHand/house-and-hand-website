(function () {
  'use strict';

  var measurementId = 'G-JLPPWEMBT5';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: 'SameSite=Lax;Secure'
  });

  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(loader);

  function placementFor(link) {
    if (link.closest('nav')) return 'navigation';
    if (link.closest('.hero')) return 'hero';
    if (link.closest('.offer')) return 'promotion';
    if (link.closest('.cta')) return 'contact_section';
    if (link.closest('footer')) return 'footer';
    return 'page';
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var eventName;
    var contactMethod;

    if (href.indexOf('tel:') === 0) {
      eventName = 'click_to_call';
      contactMethod = 'phone';
    } else if (href.indexOf('mailto:') === 0) {
      eventName = 'email_click';
      contactMethod = 'email';
    } else if (href.indexOf('facebook.com') !== -1 && /message/i.test(link.textContent)) {
      eventName = 'message_click';
      contactMethod = 'facebook';
    } else {
      return;
    }

    window.gtag('event', eventName, {
      contact_method: contactMethod,
      link_url: href,
      link_text: link.textContent.trim(),
      link_placement: placementFor(link),
      transport_type: 'beacon'
    });
  });
})();
