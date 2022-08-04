const inquirer = require('inquirer');

require('colors');


const menuOption = [{
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
        {
            value: '1',
            name: `${'1.'.blue} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.blue} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.blue} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.blue} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.blue} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.blue} Eliminar tarea`
        },
        {
            value: '0',
            name: `${'0.'.blue} Salir`
        }
    ]
}];

const inquirerMenu = async () => {

    console.clear();
    console.log('==========================='.blue);
    console.log('  Seleccione una opción');
    console.log('===========================\n'.blue);

    const {opcion} = await inquirer.prompt(menuOption);
    return opcion;

}

const confirmarDelete = async () => {

    const validacion = [
        {
            type: 'confirm',
            name: 'validate',
            message: `¿Está seguro que desea ${'ELIMINAR'.red} el registro?`
        }
    ];

    const { validate } = await inquirer.prompt(validacion);
    return validate;
}


const pausa = async () => {

    const validacion = [{
        type: 'input',
        name: 'validar',
        message: `Presione ${'ENTER'.blue} para continuar`
    }];

    console.log('\n');
    //Se hace el llamado al objeto validación en la consola para su interacción
    await inquirer.prompt(validacion);
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if (value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const listadoSeleccionable = async ( tareas = []) => {

    const choices = tareas.map((tarea, idx) => {

        const indice = `${idx +1}`.green;
        return{
            value: tarea.id,
            name: `${indice}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    //Se crean las preguntas y se agrega el choises creado con el .map previo (name debe llevar el mismo nombre que la variable que retorna los valores en este caso ids)
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    //Se muestra en consola el listado de tareas a eliminar
    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

const listadoTareaBorrar = async ( tareas = [] ) => {

    //Se recorre el arreglo de tareas con un map, para construir las opciones que se mostrarán en pantalla
    const choices = tareas.map((tarea, idx) => {

        const indice = `${idx +1}`.green;
        return{
            value: tarea.id,
            name: `${indice}. ${tarea.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    //Se crean las preguntas y se agrega el choises creado con el .map previo
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    //Se muestra en consola el listado de tareas a eliminar
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput, 
    listadoTareaBorrar,
    confirmarDelete,
    listadoSeleccionable
}