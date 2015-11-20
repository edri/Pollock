System.config({
    // defaultJSExtensions: true,
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    paths: {
        // 'aangular2/*': 'node_modules/angular2/bundles/*.js',
        // "npm:*": "node_modules/*.js",
        dev: 'src',
        prod: 'dist'
    },
    packages: {
        src: {
            main: "bootstrap",
            defaultExtension: 'ts',
        },
        dist: {
            main: "bootstrap",
            defaultExtension: 'js',
        }
    },
    map: {
        typescript: 'node_modules/typescript/lib/typescript.js'
    }
});
