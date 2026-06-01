import type ts from 'typescript/lib/tsserverlibrary';
import { id2componentName } from 'utils';

// Start of svelte output pre Svelte 4
const oldStart = `///<reference types="svelte" />
;function render() {`;

const getSuffix = (exportName: string, old: boolean) => `
;export const ${exportName}: (props: ReturnType<typeof ${old ? '' : '$$'}render>["props"]) => JSX.Element = {} as any;`;

/** Svelte component name to wrapped component name */
const transformName = (name: string) => name + 'X';

function init(modules: { typescript: typeof ts }): ts.server.PluginModule {
	const ts = modules.typescript;

	function create(info: ts.server.PluginCreateInfo) {
		const lsh = info.languageServiceHost;

		const _getScriptSnapshot = lsh.getScriptSnapshot.bind(lsh);
		lsh.getScriptSnapshot = (filename) => {
			const snapshot = _getScriptSnapshot(filename);
			if (!snapshot || !filename.endsWith('.svelte')) return snapshot;
			const code = snapshot.getText(0, snapshot.getLength());
			const exportName = transformName(id2componentName(filename));
			const newCode = code + getSuffix(exportName, code.startsWith(oldStart));
			return ts.ScriptSnapshot.fromString(newCode);
		};

		return info.languageService;
	}

	return { create };
}

export = init;
