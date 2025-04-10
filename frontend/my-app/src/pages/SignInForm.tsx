import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface FormData {
  usuario: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate(); 

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.usuario, data.password);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre de usuario</label>
          <input
            type="text"
            {...register("usuario", { required: "El usuario es obligatorio" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.usuario?.message && <p className="text-red-500 text-sm">{String(errors.usuario.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 2, message: "Mínimo 2 caracteres" } })}
            className="w-full p-2 border rounded-md"
          />
          {errors.password?.message && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Loguearse
        </button>
      </form>
    </div>
  );
}
