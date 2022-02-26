import{ useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  // se ejecuta una sola vez - obtener lo que tiene el localstorage para que al recargar 
  // la pagina no me la deje en blanco el localstorage y pueda tener lo que habia llevado
  useEffect(() => {
    const obtenerLS = () => {
      // sino hay nada en LS agreguele un arreglo vacio
      // JSON.parse para convertir el string que genera LS en un JSON
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS();
  }, [])


  // POR ULTIMO GUARDAR LOS DATOS EN EL LOCALSTORAGE
  useEffect(() => {
   localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])
  

 const eliminarPaciente = (id) => {
   // .filter no muta el objeto original sino que crea uno nuevo sacando un elemnto del array
   const pacientesActualizados = pacientes.filter(paciente  => paciente.id !== id);
   setPacientes(pacientesActualizados)
 }

  return (
    <div className="container mx-auto mt-20">
      <Header 
        
        
      />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
        pacientes={pacientes}
        setPaciente={setPaciente}
        eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
