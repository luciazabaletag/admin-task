import { FieldErrors, UseFormRegister} from 'react-hook-form'
import ErrorMessage from '../../ErrorMessage';
import { ProjectFormData } from '@/app/validation/projectForm';

type ProjectFormProps = {
    closeModal: () => void
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}
export const ProjectForm: React.FC<ProjectFormProps> = ({
    closeModal,
    errors,
    register,
}) => { 
  
  return (
    <div className="mt-4">
        <div className="flex flex-col">
            <div className="w-full px-1">
                <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="projectName">
                    Nombre del proyecto
                </label>
                <input 
                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                    id="projectName" 
                    type="text" 
                    placeholder="Nombre del proyecto"
                    {...register("projectName", {
                        required: "El Nombre del Proyecto es obligatorio",
                    })}
                />
                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>
            <div className="w-full px-1 mt-3">
                <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="clientName">
                    Cliente
                </label>
                <input 
                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                    id="clientName" 
                    type="text" 
                    placeholder="Nombre del cliente" 
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />
                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>
            <div className="w-full px-1 mt-3">
                <label className="block uppercase tracking-wide text-slate-800 text-xs font-bold mb-1" htmlFor="description">
                    Descripción
                </label>
                <textarea 
                    className="appearance-none block w-full text-gray-700 border rounded py-2 px-2 mb-1 leading-tight focus:outline-none placeholder:text-sm" 
                    id="description" 
                    placeholder="Descripción del proyecto" 
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </div>

    </div>
  )
}
