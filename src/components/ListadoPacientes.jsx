import Paciente from "./Paciente"
//import { useEffect } from "react"


const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {

  // useEffect(() => {
  //   if(pacientes.length > 0){

  //     console.log("NUEVO PACIENTE")
  //   }
  // }, [pacientes])
  
  
 
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

      {pacientes && pacientes.length ? (
        // SI HAY PACIENTES HAGA ESTO 
        <>
          <h2 className="font-black text-3xl text-center">Listado pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Adminitra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          
          </p>
          {pacientes.map( (paciente) =>  
          
            <Paciente 
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
            
          )}
        </>

      ): (
      //"NO HAY PACIENTES"
     <>
        <h2 className="font-black text-3xl text-center">NO HAY PACIENTES</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando pacientes {' '}
          <span className="text-indigo-600 font-bold"> y apareceran en este lugar</span>
        
        </p>
     </>
      
      )
      }
   </div>
  )
}

export default ListadoPacientes
