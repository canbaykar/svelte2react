# unplugin-svelte2react Example

To get this example working on your computer:

1. Make sure [Node.js](https://nodejs.org/) is installed on your computer.

2. Open your terminal and navigate to an available folder.

3. Run:
    ```bash
    # Clone this repo
    git clone https://github.com/canbaykar/svelte2react
    # Enter into the repo directory
    cd svelte2react
    # Install the dependencies for svelte2react
    pnpm i
    # Build svelte2react
    pnpm build
    # Enter into the example directory
    cd examples
    cd with-unplugin
    # Install the dependencies for the example application
    pnpm i
    # Finally, run the example application
    pnpm dev:open
    # You can stop the Vite server with Ctrl+C
    ```
    Additionally make sure your editor uses the TypeScript version stored in your `node_modules`. (In VS Code via: `Ctrl+Shift+P` → `>TypeScript: Select TypeScript Version`. You may need to open a `.js` or `.ts` file first for this command to appear in the Command Palette.)
