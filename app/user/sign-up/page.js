import Image from "next/image";
import Link from "next/link";

function page() {
  return(
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-5">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Dirección de email</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-2 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Repita la contraseña</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 px-3 focus:ring-2 focus:ring-inset focus:ring-zinc-900 sm:text-sm sm:leading-6"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-zinc-950 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-100 shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">Iniciar sesión</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Ya tiene cuenta?  
          <Link href="/user/sign-in" className="font-semibold leading-6 text-zinc-900 hover:text-amber-500 pl-1">Haga click aquí</Link>
        </p>
      </div>
  );
  
}


export default page;
