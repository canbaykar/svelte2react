import path from "node:path";
import fs from "node:fs";
import type { Plugin } from "rollup";

const PLUGIN_NAME = "svelte2react";
const PLUGIN_FULL_NAME = "rollup-plugin-" + PLUGIN_NAME;
const DEPENDENCY = "@baykar/svelte2react";

const transformName = (name: string) => name + "X";

interface PluginOptions {
    /** 
     * Skip the check to see if **\@baykar/svelte2react** is in package.json dependecies.
     * This check can be skipped safely if **\@baykar/svelte2react** is installed.
     * You can install it with: *(if using npm)* 
     * @example `npm i -D @baykar/svelte2react`
     */
    skipDependencyCheck?: boolean;
}

export default function svelte2react({
    skipDependencyCheck = false,
}: PluginOptions = {}): Plugin {
  return {
    name: PLUGIN_NAME,

    // Only for dependency check error
    buildStart() {
        if (skipDependencyCheck) return;
        
        const pkgPath = path.resolve(process.cwd(), 'package.json');
        let pkgRead = false;
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
            const deps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
            if (!deps[DEPENDENCY]) {
                pkgRead = true;
                this.error(`Missing required dependency for ${PLUGIN_FULL_NAME}: "${DEPENDENCY}". Please install it before building, or if you know what you are doing, set skipDependencyCheck to true in ${PLUGIN_FULL_NAME} options.`);
            }
        } catch (e) {
            if (pkgRead) this.error(e as any);
            this.error(`${PLUGIN_FULL_NAME} could not read package.json at ${pkgPath}. Make sure you have "${DEPENDENCY}" installed, and if necessary, skip this check by setting skipDependencyCheck to true in ${PLUGIN_FULL_NAME} options. Error details: ${(e as any)?.message}`);
        }
    },

    transform(code, id) {
      const id_ = removeQueries(id);
      const ext_ = path.extname(id_);
      if (ext_ !== '.svelte') return null;

      const svelteExportName = getDefaultExport(code);
      const reactExportName = transformName(svelteExportName);

      return {
        code: code + '\n' + `
import { Wrap } from "${DEPENDENCY}";
export const ${reactExportName} = Wrap(${svelteExportName});`,
        map: null,
      };
    },
  };
}

/** Removes queries like ?inline from id */
function removeQueries(id: string) {
  const ext = path.extname(id);
  return path.basename(id, ext.match(/(?:\?.*)?$/)?.[0]);
}

/** Looks for default export variable name */
function getDefaultExport(code: string) {
  const exp = code.match(/export default ([_$a-zA-Z][_$a-zA-Z0-9]*);/)?.[1];
  if (!exp) throw new Error("svelte2react couldn't parse default export name.");
  return exp;
}