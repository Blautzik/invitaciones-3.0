'use client'

import React, { useState } from 'react';
import { FadeInSection } from './FadeInSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormularioProps {
  form_id: string;
  frase_extra?: string;
  bg?: string;
  otra_frase?: string;
  frase_formulario?: string;
}

interface FormData {
  id: string;
  name: string;
  cancion: string; // Changed from email
  chicos: string;
  message: string;
  menu: string;
}

export const Formulario: React.FC<FormularioProps> = ({
  form_id,
  frase_extra,
  bg,
  otra_frase,
  frase_formulario,
}) => {
  const [name, setName] = useState<string>('');
  const [cancion, setCancion] = useState<string>(''); // Changed from email
  const [chicos, setChicos] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [menu, setMenu] = useState<string>('Menú Principal');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const id: string = form_id;
  const con_menu: boolean = true;
  const con_mail: boolean = true; // Still used for logic, but now it’s "song"
  const menu_especial: boolean = false;
  const sin_menu_infantil: boolean = true;
  const frase: string | undefined = undefined;

  const isFormValid: boolean = !!name && !!cancion && !!menu; // Updated to cancion
  const texto: string = "text-white";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || !isFormValid) {
      return;
    }

    setIsSubmitting(true);

    const form: FormData = {
      id,
      name,
      cancion, // Changed from email
      chicos,
      message,
      menu,
    };

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const content = await response.json();

      if (response.ok) {
        setMessage('');
        setChicos('');
        setName('');
        setCancion(''); // Changed from email
        setMenu('Menú Principal');
        setIsSubmitting(false);

        alert('Asistencia registrada correctamente! Muchas gracias!');
      } else {
        setIsSubmitting(false);
        alert('Error al registrar la asistencia. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      setIsSubmitting(false);
      alert('Error al registrar la asistencia. Por favor, intenta nuevamente.');
    }
  };

  return (
    <section className="bg-black text-white py-32 md:py-40 px-6 md:px-16 w-screen min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <FadeInSection>
            <h3 className="text-2xl md:text-3xl font-serif my-4 tracking-wide leading-7">
              Confirmar Asistencia
            </h3>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-md md:text-lg font-sans max-w-2xl font-[500]">
              Por favor completá el formulario con tus datos y comentarios para organizar la mejor fiesta
            </p>
          </FadeInSection>
          {frase && (
            <FadeInSection delay={0.4}>
              <p className="text-md md:text-lg font-sans max-w-2xl font-[700]">
                {frase}
              </p>
            </FadeInSection>
          )}
        </div>

        <form className="space-y-8 mx-auto w-full max-w-lg" onSubmit={handleSubmit}>
          <FadeInSection delay={0.2}>
            <div className="flex flex-col">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                className="bg-transparent border-b border-gray-800 text-white placeholder-gray-400 py-3 md:py-4 focus:outline-none focus:border-white transition-colors duration-300"
                placeholder="Nombre y Apellido"
              />
            </div>
          </FadeInSection>

          {con_mail && (
            <FadeInSection delay={0.3}>
              <div className="flex flex-col">
                <label htmlFor="cancion" className="sr-only">
                  Canción
                </label>
                <input
                  value={cancion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCancion(e.target.value)}
                  type="text" // Changed from email
                  name="cancion"
                  id="cancion"
                  className="bg-transparent border-b border-gray-800 text-white placeholder-gray-400 py-3 md:py-4 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="¿Qué canción no puede faltar?"
                />
              </div>
            </FadeInSection>
          )}

          {con_menu && (
            <>
              <FadeInSection delay={0.4}>
                <h3 className="text-md md:text-lg font-sans font-[500] mb-2">
                  Opciones de menú
                </h3>
              </FadeInSection>
              <FadeInSection delay={0.5}>
                <div className="flex flex-col">
                  <Select onValueChange={setMenu} value={menu}>
                    <SelectTrigger className="bg-transparent border-b border-gray-800 text-white py-3 md:py-4 focus:outline-none focus:border-white transition-colors duration-300">
                      <SelectValue placeholder="Selecciona un menú" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Menú Principal">Menú Principal</SelectItem>
                      <SelectItem value="Menú Vegetariano">Menú Vegetariano</SelectItem>
                      <SelectItem value="Menú Vegano">Menú Vegano</SelectItem>
                      <SelectItem value="Menú Celíaco">Menú Celíaco</SelectItem>
                      {!sin_menu_infantil && (
                        <SelectItem value="Menú Adolescente/Niño">Menú Adolescente/Niño</SelectItem>
                      )}
                      <SelectItem value="Otro, Especificar en comentarios">Otro, Especificar en comentarios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FadeInSection>
            </>
          )}

          <FadeInSection delay={0.6}>
            <div className="flex flex-col">
              <label htmlFor="message" className="sr-only">
                Mensaje
              </label>
              <textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                id="message"
                className="bg-transparent border-b border-gray-800 text-white placeholder-gray-400 py-3 md:py-4 h-24 focus:outline-none focus:border-white transition-colors duration-300 resize-none" // Changed from h-40 to h-24
                placeholder={frase_formulario || "Comentarios y saludos"}
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.8}>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`${
                  isSubmitting || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                } bg-white text-black font-sans font-[600] text-[14px] px-6 py-3 rounded-full uppercase tracking-wider transition-opacity duration-300`}
                disabled={isSubmitting || !isFormValid}
              >
                {isSubmitting ? "Enviando..." : "Confirmar"}
              </button>
            </div>
          </FadeInSection>
        </form>
      </div>
    </section>
  );
};