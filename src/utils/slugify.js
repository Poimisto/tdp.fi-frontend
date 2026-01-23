import GithubSlugger from 'github-slugger';

export const slugify = (text) => {
  const slugger = new GithubSlugger();
  return '\\' + slugger.slug(text);
};
