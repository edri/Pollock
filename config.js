System.config({
    // defaultJSExtensions: true,
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    paths: {
        "npm:*": "node_modules/*",
        dev: 'src',
        prod: 'dist'
        // 'angular2/*': 'node_modules/angular2/*.js'
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
