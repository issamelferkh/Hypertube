const define = locale => {
  var lang;
  switch (locale) {
    case "en":
      lang = require("../locale/en");
      break;
    case "ar":
      lang = require("../locale/ar");
      break;
    case "fr":
      lang = require("../locale/fr");
      break;
    default:
      lang = require("../locale/en");
  }
  return lang;
};

export default { define };
