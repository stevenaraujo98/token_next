"use client"
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [setshowCode, setSetshowCode] = useState(false);
  const { handleSubmit, register } = useForm({mode: 'onChange'});

  const handleClick = (data) => {
    console.log('click');
    console.log(data);
    setSetshowCode(true);
  }

  return (
    <div>
      <h1 className='mb-10 font-semibold text-center'>Generacion de Token</h1>
      
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
            disabled={setshowCode}
          />
        </div>

        <button 
          class={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${setshowCode ? "bg-slate-400" : "bg-indigo-600 hover:bg-indigo-500"}`}
          disabled={setshowCode}
        >
          Generar Usuario
        </button>
      </form>

      <p class="flex mt-10 text-center text-sm gap-x-5 justify-center">
        <div>
          <Link
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            href={"/"}
          >
            Crear usuario
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

      {
        setshowCode && 
        <div className="m-5 bg-white rounded-md p-10 space-y-6">
          <h3 className='mb-2 font-semibold text-center'>Codigo de contraseña</h3>
          <div className="text-center">
            <p>[Codigo]</p>
          </div>
          <button 
            class={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 bg-red-700 hover:bg-red-500`}
            onClick={() => setSetshowCode(false)}
          >
            Cancelar
          </button>
        </div>
      }
    </div>
  );
};

export default Page;
