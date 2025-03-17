'use client';

import React, { useState } from 'react';
import { FadeInSection } from './FadeInSection'; // Adjust path as needed
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // ShadCN UI Accordion components
import { Copy, Check } from 'lucide-react';

interface RegalosProps {
  fraseRegalos: string;
  titular?: string;
  cbu?: string;
  alias?: string;
  dni?: string;
}

const Regalos: React.FC<RegalosProps> = ({
  fraseRegalos,
  titular,
  cbu,
  alias,
  dni,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Copy to clipboard function
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <section className="bg-black text-white py-32 md:py-40 px-6 md:px-16 w-screen min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <FadeInSection>
            <h3 className="text-2xl md:text-3xl font-serif my-4 tracking-wide leading-7">
              Regalos
            </h3>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div
              className={`text-md md:text-lg font-sans max-w-2xl ${alias ? 'font-light' : 'font-normal'} leading-5`}
            >
              {fraseRegalos}
            </div>
          </FadeInSection>
        </div>

        {titular && (
          <FadeInSection delay={0.4}>
            <div className="w-full max-w-lg mx-auto">
              <style jsx global>{`
                @keyframes slideDown {
                  from { height: 0; opacity: 0; }
                  to { height: var(--radix-accordion-content-height); opacity: 1; }
                }
                
                @keyframes slideUp {
                  from { height: var(--radix-accordion-content-height); opacity: 1; }
                  to { height: 0; opacity: 0; }
                }
                
                .accordion-content[data-state='open'] {
                  animation: slideDown 300ms ease-out forwards;
                  overflow: hidden;
                }
                
                .accordion-content[data-state='closed'] {
                  animation: slideUp 300ms ease-out forwards;
                  overflow: hidden;
                }
                
                .accordion-container {

                  display: flex;
                  flex-direction: column;
                }
                
                .accordion-item {
                  flex: 1;
                }
              `}</style>
              <div className="accordion-container bg-gray-900 text-white rounded-sm shadow-md">
                <Accordion
                  type="single"
                  collapsible
                  className="accordion-item"
                >
                  <AccordionItem value="datos-bancarios" className="border-b border-gray-800">
                    <AccordionTrigger className="px-4 py-3 text-left hover:bg-gray-800 transition-colors">
                      Datos Bancarios
                    </AccordionTrigger>
                    <AccordionContent className="accordion-content px-4 py-3">
                      <div className="text-sm">
                        <p className="pb-2">
                          <strong>Titular: </strong> {titular}
                        </p>
                        {cbu && (
                          <p className="pb-2 flex items-center justify-between">
                            <span>
                              <strong>CBU/CVU:</strong> {cbu}
                            </span>
                            <button
                              onClick={() => copyToClipboard(cbu, 'cbu')}
                              className="ml-2 p-1 hover:bg-gray-700 rounded-sm transition-colors"
                              title="Copiar CBU"
                            >
                              {copiedField === 'cbu' ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4 text-white" />
                              )}
                            </button>
                          </p>
                        )}
                        {alias && (
                          <p className="pb-2 flex items-center justify-between">
                            <span>
                              <strong>Alias: </strong> {alias}
                            </span>
                            <button
                              onClick={() => copyToClipboard(alias, 'alias')}
                              className="ml-2 p-1 hover:bg-gray-700 rounded-sm transition-colors"
                              title="Copiar Alias"
                            >
                              {copiedField === 'alias' ? (
                                <Check className="h-4 w-4 text-green-400" />
                              ) : (
                                <Copy className="h-4 w-4 text-white" />
                              )}
                            </button>
                          </p>
                        )}
                        {dni && (
                          <p className="pb-2">
                            <strong>DNI: </strong> {dni}
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </FadeInSection>
        )}
      </div>
    </section>
  );
};

export default Regalos;