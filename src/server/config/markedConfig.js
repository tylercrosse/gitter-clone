import Prism     from 'prismjs';
import languages from './languages.json';

const markedConfig = {
  sanitize: true,
  highlight: highlightMethod
};

export const highlightMethod = (code, language) => {
  if (!languages.includes(language)) {
    language = 'markup'; // eslint-disable-line no-param-reassign
  }
  return (
    Prism.highlight(code, Prism.languages[language])
  );
};

export default markedConfig;
