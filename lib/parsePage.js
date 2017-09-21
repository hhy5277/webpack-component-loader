import path from 'path';
import fs from 'fs';

const components = [];
const pushedComponents = new Map();

function recursiveParse(source, extractor, srcPath) {
  const includes = extractor(source);
  if (!includes) return;
  includes.forEach((componentPath) => {
    if (pushedComponents.get(componentPath)) return;
    pushedComponents.set(componentPath, true);
    const parsed = path.parse(componentPath);
    components.push(parsed);
    recursiveParse(fs.readFileSync(path.join(srcPath, parsed.dir, parsed.name, parsed.base), 'utf8'), extractor, srcPath, components, pushedComponents);
  });
}

export default function parsePage(source, extractor, buildOption) {
  recursiveParse(source, extractor, buildOption.srcPath);
  const pageSelf = path.parse(buildOption.currentPagePath);
  pageSelf.dir = '';
  components.push(pageSelf);
  return components;
}