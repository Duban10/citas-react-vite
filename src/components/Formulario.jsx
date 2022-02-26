import {useState, useEffect} from 'react'
import Error from './Error'


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const  [error, setError] = useState(false);

  // useEffect se va ejecutar cuando paciente haya cambiado
  // Comprobar que un objeto tiene  algo Object.keys(paciente).length > 0
  useEffect(() => {    
    if(Object.keys(paciente).length > 0){
     setNombre(paciente.nombre)
     setPropietario(paciente.propietario)
     setEmail(paciente.email)
     setFecha(paciente.fecha)
     setSintomas(paciente.sintomas)
    }
  }, [paciente])

    // si paso las dependencias vacias el useEffects solo se va a ejecutar una sola vez
    // si tiene una dependencia se va ejecutar cada vez que esa dependencia (paciente) cambie
  //   useEffect(() => {
  //     console.log("EL COMPONENTE ESTA LISTO")
  // }, [])
  

  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    // VALIDACION DEL FORMULARIO
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay almenos un campo vacio')
      setError(true)
      return;
    }
    setError(false)

    // OBJETO DE PACIUENTE
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
     
    }

    // DETECTAR UN REGISTRO NUEVO O UNA EDICION
    if(paciente.id){
      // Editando el registro
      objetoPaciente.id = paciente.id

      const pacienteActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ?
        objetoPaciente : pacienteState
        )

      setPacientes(pacienteActualizado)
      //PARA QUE QUEDE EN BLANCO EL ARREGLO DEL PACIENTE Y NO ACUMULAR ESPACIO EN MEMORIA
      setPaciente({})
      
    }else{
      // Nuevo registro
      objetoPaciente.id = generarId()
      // tomamos una copia de lo que haya en paciente para no tocar el arreglo original y le pasamos el nuevo objeto
      setPacientes([...pacientes, objetoPaciente])

    }


    // REINICIAR EL FORMULARIO
    setNombre('')
    setPropietario('')
    setEmail('')
    setSintomas('')
    setFecha('')
    

  }

  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
       <h2 className="font-black text-3xl text-center">Seguimiento Clientes</h2>

       <p className="text-lg mt-5 mb-10 text-center">Añade clientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>       
       </p>

       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

         {error && <Error>
                  <p>TODOS LOS CAMPOS SON OBLIGATORIOS</p>
                  </Error>
           
         }


         <div className="mb-5">
           <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Cliente</label>
           <input 
           id="mascota" 
           type="text" 
           className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md" 
           placeholder="Nombre del cliente"
           value={nombre}
           onChange={ (e) => setNombre(e.target.value)}
           >
          
             
           </input>
         </div>
         <div className="mb-5">
           <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
             Pedido</label>
           <input 
           id="propietario" 
           type="text" 
           className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md" 
           placeholder="Nombre del propietario"
           value={propietario}
           onChange={ (e) => setPropietario(e.target.value)}
           >
             
           </input>
         </div>
         <div className="mb-5">
           <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
             Telefono</label>
           <input 
           id="email" 
           type="text" 
           className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md" 
           placeholder="Telefono contacto del cliente"
           value={email}
           onChange={ (e) => setEmail(e.target.value)}
           >
             
           </input>
         </div>
         <div className="mb-5">
           <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
             Hora aproximada para entrega</label>
           <input 
           id="alta" 
           type="time" 
           className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md" 
           placeholder="Hora aproximada para entrega"
           value={fecha}
           onChange={ (e) => setFecha(e.target.value)}
           >
             
           </input>
         </div>
         <div className="mb-5">
           <label htmlFor="des" className="block text-gray-700 uppercase font-bold">
             Detalles</label>
           <textarea htmlFor="des"
            className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md" 
            placeholder="Describe los detalles a tener en cuenta del pedido"
            value={sintomas}
           onChange={ (e) => setSintomas(e.target.value)}
           /> 
          
         </div>
         <input 
         type="submit" 
         className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
         hover:bg-indigo-700 cursor-pointer transition-colors" 
         value={ paciente.id ? 'Editar Pedido': 'Agregar Pedido'}
         />
       </form>

    </div>
  )
}

export default Formulario
