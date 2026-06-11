(function () {
  "use strict";

  var host = window.location.hostname || "";
  var settings = {};

  if (!host) return;

  settings.torrserver_use_link = "one";
  settings.internal_torrclient = true;
  settings.torrserver_url = "http://" + host + ":5665";
  settings.parser_use = true;
  settings.parse_in_search = true;
  settings.parser_use_link = "one";
  settings.parser_torrent_type = "jackett";
  settings.jackett_url = "http://" + host + ":8080/jacred";
  settings.jackett_key = "";
  settings.jackett_url_two = "";
  settings.jackett_key_two = "";

  function loadSmileReactions() {
    if (document.querySelector('script[data-smile-reactions-loader="true"]')) return;

    var script = document.createElement("script");
    var version = Date.now();

    script.type = "text/javascript";
    window.__smileReactionsPluginLoaded = false;
    script.src = "./smile_reactions.js?v=" + version;
    script.setAttribute("data-smile-reactions-loader", "true");

    (document.head || document.body || document.documentElement).appendChild(script);
  }

  function applySettings() {
    Object.keys(settings).forEach(function (name) {
      localStorage.setItem(name, String(settings[name]));

      if (window.Lampa && Lampa.Storage) {
        Lampa.Storage.set(name, settings[name], true);
      }
    });
  }

  try {
    applySettings();
  } catch (e) {
    console.log("[SmileReactionsBoot] settings skipped", e);
  }

  loadSmileReactions();
})();
