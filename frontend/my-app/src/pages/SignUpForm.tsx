import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { getDistricts } from '../api/district';
import { registerUser } from "../api/auth";
import { District } from "../types/district";

interface FormData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  district: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    getDistricts().then(data => {
      setDistricts(data.results);
    });
  }, []);

  const onSubmit = async(data: FormData) => {
    await registerUser({
      username: data.email,
      email: data.email,
      password: data.password,
      first_name: data.name,
      last_name: data.lastName,
      phone_number: data.phone,
      district: data.district,
    })
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.name?.message && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            {...register("lastName", { required: "El Apellido es obligatorio" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.lastName?.message && <p className="text-red-500 text-sm">{String(errors.lastName.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Número de Teléfono</label>
          <input
            type="tel"
            {...register("phone", { required: "El teléfono es obligatorio" })}
            className="w-full p-2 border rounded-md"
          />
          {errors.phone?.message && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "El email es obligatorio", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Email inválido" } })}
            className="w-full p-2 border rounded-md"
          />
          {errors.email?.message && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
            className="w-full p-2 border rounded-md"
          />
          {errors.password?.message && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Barrio</label>
          <select {...register("district", { required: "Selecciona un barrio" })} className="w-full p-2 border rounded-md">
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>))}
          </select>
          {errors.district?.message && <p className="text-red-500 text-sm">{String(errors.district.message)}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Registrarse
        </button>
      </form>
    </div>
  );
}
