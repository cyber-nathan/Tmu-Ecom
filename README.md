# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

***
# setup
- set up ssh

- ```git clone git@github.com:cyber-nathan/Tmu-Ecom.git```
    to put this repo into your own computer

- open in vs code
 
- run `npm install` to install the node module packages from package.json

# To Run
- To run the react app localy `npm run dev` in terminal

# To make changes
- do `git fetch` to make sure that your code on your local machine is in sync with remote ie github
- do `git pull` if your local is out of sync with remote
- If you want to make any changes make sure to create a branch with command `git checkout -b nameofbranch`

- After making whatever changes to the branch you created run this command `git commit -am "message"` then `git push` or use vs code to commit and push.
when doing the first option you might see a error message like this
```
fatal: The current branch dummybranch has no upstream branch.    
To push the current branch and set the remote as upstream, use   

    git push --set-upstream origin nameOfYourBranch

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.    
```
just run the suggest git command 
