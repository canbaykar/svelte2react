import path from "node:path";
import { pascalCase } from "scule";

// Copied (modified) from classNameFromFilename in:
// https://github.com/sveltejs/language-tools/blob/6bd8b175ad5918b5822e4323a4e67d79918eff84/packages/svelte2tsx/src/svelte2tsx/addComponentExport.ts#L1
// Modifications here don't change behaviour from the original unless commented otherwise.
// It's not very important for this to exactly match with Svelte.
function classNameFromFilename(filename: string) {
    try {
        const withoutExtensions = path.parse(filename).name?.split('.')[0];
        const withoutInvalidCharacters = withoutExtensions
            .split('')
            // Although "-" is invalid, we leave it in, pascal-case-handling will throw it out later
            .filter((char) => /[A-Za-z_\d-]/.test(char))
            .join('');
        const firstValidCharIdx = withoutInvalidCharacters
            .split('')
            // Although _ and $ are valid first characters for classes, they are invalid first characters
            // for tag names. For a better import autocompletion experience, we therefore throw them out.
            .findIndex((char) => /[A-Za-z]/.test(char));
		// BEHAVIOR CHANGING MODIFICATION: Changed substr to substring. Different with argument -1:
		// '123'.substr(-1) is '3' but '123'.substring(-1) is '123'.
		// Latter is probably the original intention and probably will change in the future.
        const withoutLeadingInvalidCharacters = withoutInvalidCharacters.substring(firstValidCharIdx);
        const inPascalCase = pascalCase(withoutLeadingInvalidCharacters);
        return firstValidCharIdx === -1 ? `A${inPascalCase}` : inPascalCase;
    } catch (error) {
        console.warn(`Failed to create a name for the component class from filename ${filename}`);
		// BEHAVIOR CHANGING MODIFICATION: Returns 'Component' instead of undefined
        return 'Component';
    }
}

/**
 * @example removeQueries('folder/file.tsx?inline') // Returns 'folder/file.tsx'
 * @param id File name or id that possibly contains queries like `?inline`
 */
export function removeQueries(id: string) {
	return id.replace(/\?.*$/, '');
}

/**
 * Convert a Svelte file id (like `./src/button_twentyOne.widget.svelte?inline`) to its
 * default Svelte component name (like `ButtonTwentyOne`). Folder seperator can be both
 * '/' and '\\'. Based on the Svelte Typescript plugin, not the Svelte compiler.
 * @param id Path+file name possibly with queries like `?inline`
 */
export function id2componentName(id: string) {
	return classNameFromFilename(removeQueries(id));
}