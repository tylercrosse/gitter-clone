import Prism from 'prismjs';

const markedConfig = {
  sanitize: true,
  highlight: highlightMethod
};

export function highlightMethod(code, language) {
  let markup;
  try {
    markup = Prism.highlight(code, Prism.languages[language]);
  } catch (e) {
    language = 'markup'; // eslint-disable-line no-param-reassign
    markup = Prism.highlight(code, Prism.languages[language]);
  }
  return markup;
}

export default markedConfig;
