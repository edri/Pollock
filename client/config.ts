/// <reference path="typings/tsd.d.ts" />

System.config({
    // defaultJSExtensions: true,
    transpiler: 'typescript',
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    paths: {
        dev: 'src',
        prod: 'javascripts'
    },
    packages: {
        src: {
            main: "bootstrap",
            defaultExtension: 'ts',
        },
        dist: {
            main: "bootstrap",
            defaultExtension: 'js',
        },
        javascripts: {
            main: "bootstrap",
            defaultExtension: 'js',
        }
    },
    map: {
        typescript: 'node_modules/typescript/lib/typescript.js'
    }
});
