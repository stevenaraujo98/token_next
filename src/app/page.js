"use client"
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function Home() {
  const { handleSubmit, register } = useForm({mode: 'onChange'});

  const handleClick = (data) => {
    console.log('click');
    console.log(data);
  }
  return (
    <div>
      {/* justify-between */}
      <h1 className='mb-10 font-semibold text-center'>Crear usuario</h1>

      <div className='mt-2 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className="space-y-6" onSubmit={handleSubmit(handleClick)}>
          <div>
            <label 
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              Ingrese el nombre del usuario
            </label>
            <input 
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
              {...register('cliente')} 
              type="text" 
              placeholder=""
            />
          </div>

          <div>
            <button 
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
            >
              Crear usuario
            </button>
          </div>
        </form>

        <p class="flex mt-10 text-center text-sm gap-x-5 justify-center">
          <div>
            <Link 
              class="font-semibold leading-6 text-indigo-700 hover:text-indigo-500"
              href={"/generartoken"}
            >
              Generar Token
            </Link>
          </div>
          <div>
            <Link 
              class="font-semibold leading-6 text-amber-700 hover:text-amber-500"
              href={"/validartoken"}
              target="_blank"
            >
              Validar Token
            </Link>
          </div>
        </p>
      </div>
    </div>
  )
}
