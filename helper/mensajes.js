require('colors');


const mostrarMenu = () => {

    
    return new Promise( resolve => {
        console.clear();
        console.log('==========================='.blue);
        console.log('  Seleccione una opción'.blue);
        console.log('===========================\n'.blue);


        console.log(`${'1.'.blue} Crear tarea`);
        console.log(`${'2.'.blue} Listar tareas`);
        console.log(`${'3.'.blue} Listar tareas completadas`);
        console.log(`${'4.'.blue} Listar tareas pendientes`);
        console.log(`${'5.'.blue} Completar tarea(s)`);
        console.log(`${'6.'.blue} Eliminar tarea`);
        console.log(`${'0.'.blue} Salir\n`);


        //Se crea y prepara la interfaz para el trabajo con la consola (ingreso de datos de usuario y mensaje de salida)
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opt) => {
            /*
            Siempre que se termina de usar un readline se debe cerar para que el programa cierre y 
            no quede a la espera de información del usuario en un loop
            */
            readline.close();
            resolve(opt);
        });

    });
}

const pausa = () => {

    return new Promise(resolve =>{
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        });
    });
}


//Con module exports podremos acceder a las funciones desarrolladas en este archivo/clase, en otras
module.exports = {
    mostrarMenu,
    pausa
}

