import { ReactNode } from "react";

export default function Page({canvas} : {canvas: ReactNode}) {
    return(
        <div>
            {canvas}
            <div className="mb-4">
            <form>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Indica el número de etiquera
                </label>
                <input
                    id="name"
                    name="name"
                    type="number"
                    placeholder="Número de etiqueta"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    required
                />
            </form>
            </div>

        </div>
    )
}