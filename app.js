//Se hace el llamado a colors, para dar apariencia amigable a la consola donde se trabajará
require('colors');

const { guardarDB, leerDB } = require('./helper/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmarDelete,
    listadoSeleccionable
} = require('./helper/inquirer');
const Tareas = require('./models/tareas');

//Se crea un metodo main asincrono para programar las tareas que requieran trabajar con async await
const main = async () => {

    let opcion = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {

        opcion = await inquirerMenu();    
        switch(opcion){
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await listadoSeleccionable( tareas.listadoArr);
                tareas.actualizarCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareaBorrar( tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmarDelete();
                    if(ok){
                        tareas.borrarTarea( id );
                        console.log(`Tarea eliminada`);
                    }
                }
            break;
        }  
    guardarDB(tareas.listadoArr);
    await pausa();

    } while (opcion !== '0');
    
}




main();