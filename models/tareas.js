const Tarea = require("./tarea");



class Tareas {

    _listado = {};

    get listadoArr() {
        const listadoTareas = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listadoTareas.push(tarea)
        });
        return listadoTareas;
    }

    constructor(){
        this._listado = {};
    }


    cargarTareasFromArray(tareas = []){
        
        //Se recorre con foreach para trabajar con cada elemento del arreglo tareas[]
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
        
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    borrarTarea( id = ''){

        if(this._listado[id]){
            delete this._listado[id];
        }
    }



    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, index) => {

            const indice = `${index+1}`.green;
            const {desc, completadoEn} = tarea;

            //Comprobamos completadoEn, si existe estado = Completado en verde. Si no estado=Incompleto en rojo
            const estado = (completadoEn)
                        ? 'Completado'.green
                        : 'Incompleto'.red;

            console.log(`${indice}. ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        let indice = 0;
        this.listadoArr.forEach( tarea => {

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completado'.green
                            : 'Incompleto'.red;

            //Se comprueba que el valor recibido como parametro exista.
            if(completadas){
                //Si existe, revisamos que completadoEn tenga valores y se imprime(tareas completas)
                if(completadoEn){
                    indice +=1;
                    console.log(`${ (indice + '.').green } ${desc} :: ${completadoEn.green}`);
                }
            }else{
                //Si no existe, se comprueba si completadoEn es null y se imprime (tareas incompletas)
                if(!completadoEn){
                    indice +=1;
                    console.log(`${ (indice + '.').green } ${desc} :: ${estado}`);
                }
            }
            
        });
    }

    actualizarCompletadas (ids = []){

        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;