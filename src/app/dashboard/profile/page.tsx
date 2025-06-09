"use client";

import Link from "next/link";
import { useState } from "react";

export default function Profil() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Perfil</h1>

        {selectedImage && (
          <div className="mb-2">
            <img
              src={selectedImage}
              alt="Preview"
              height={200}
              width={200}
              className="h-auto rounded-lg border mx-auto"
            />
          </div>
        )}

        <div className="mb-4 h-16 flex justify-center items-center">
          <label className="font-medium  cursor-pointer text-white bg-blue-500 p-2 rounded-l-md" htmlFor="image"> Imagem </label>
          <input type="file" id="image" accept="image/*"
            className="flex-1 bg-slate-200 cursor-pointer outline-none p-2 focus:outline-none rounded-r-md focus:ring-0 focus:none"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-0" htmlFor="name"> Nome </label>
          <input type="text" id="name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-0" htmlFor="email"> Email </label>
          <input type="email" id="email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          
          <Link href="/dashboard">
          <button type="submit"
            className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg 
            hover:bg-blue-600 transition duration-300 cursor-pointer">Enviar</button>
          </Link>

          <Link href="/dashboard">
               <button type="submit"
                className="w-full border bg-red-400 text-white py-2 px-4 rounded-lg
              hover:bg-red-600 hover:text-white transition duration-300 cursor-pointer">Voltar</button>
          </Link>

         
        </div>
      </div>
    </div>
  );
}