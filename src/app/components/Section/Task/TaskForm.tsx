import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form"
import ErrorMessage from "../../ErrorMessage";
import { TaskFormData, TaskFormDataProject, TaskStatus } from "@/app/types";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormDataProject | TaskFormData>
    watch: UseFormWatch<TaskFormData>
}

export default function TaskForm({errors, register, watch} : TaskFormProps) {

    watch(["priority", "status"]);

    return (
        <>
            <div className="mt-8">
                <h1 className='uppercase tracking-wide inline text-slate-800 text-md font-bold border-0 border-b-4 border-b-admintask'>Crear una nueva tarea</h1>
                <div className="flex flex-col mt-5">
                    <div className="w-full px-1">
                        <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="name">
                            Nombre de la tarea
                        </label>
                        <input 
                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                            id="name" 
                            type="text" 
                            placeholder="Nombre de la tarea"
                            {...register("name", {
                                required: "El Nombre de la tarea es obligatorio",
                            })}
                        />
                        {errors.name && (
                            <ErrorMessage>{errors.name.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="w-full px-1 mt-3">
                        <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="description">
                            Descripción
                        </label>
                        <textarea 
                            className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                            id="description" 
                            placeholder="Descripción de la tarea" 
                            {...register("description", {
                                required: "Una descripción de la tarea es obligatoria"
                            })}
                        />
                        {errors.description && (
                            <ErrorMessage>{errors.description.message}</ErrorMessage>
                        )}
                    </div>
                    <div className="w-full px-1 mt-3">
                        <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="priority">
                            Prioridad
                        </label>
                        <select 
                            className="w-full text-gray-700 border rounded py-2 px-2 mb-1 text-sm focus:outline-none bg-white"
                            {...register("priority")}
                            id="priority"
                        >
                            <option className="font-sans" value={"low"}>Baja</option>
                            <option className="font-sans" value={"medium"}>Media</option>
                            <option className="font-sans" value={"high"}>Alta</option>
                        </select>
                    </div>
                    <div className="w-full px-1 mt-3">
                        <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="status">
                            Estado
                        </label>
                        <select 
                            className="w-full text-gray-700 border rounded py-2 px-2 mb-1 text-sm focus:outline-none bg-white"
                            {...register("status")}
                            id="status"
                        >
                            <option className="font-sans" value={"pending"}>Pendiente</option>
                            <option className="font-sans" value={"inProgress"}>En curso</option>
                            <option className="font-sans" value={"completed"}>Finalizada</option>
                        </select>
                    </div>
                </div>

            </div>
        </>
    )
}