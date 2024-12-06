import React from 'react';
import { Instagram, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white pt-16 pb-8 transition-colors duration-300 relative before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-gray-700 dark:before:via-gray-800 before:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <Link 
              to="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 hover:from-indigo-300 hover:to-violet-300 transition-all duration-300"
            >
              NEXUS
            </Link>
            <p className="mt-4 text-slate-400 dark:text-slate-500 max-w-sm">
              Selecionando produtos premium para elevar seu estilo de vida. 
              Qualidade e sofisticação em cada detalhe.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="text-slate-400 dark:text-slate-500 hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300 flex items-center gap-2"
              >
                <Instagram className="w-6 h-6" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-slate-200 mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {['Sobre Nós', 'Contato', 'FAQ', 'Política de Privacidade'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#" 
                    className="text-slate-400 dark:text-slate-500 hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold text-white dark:text-slate-200 mb-4">
              Atendimento
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-slate-400 dark:text-slate-500">
                <Mail className="w-5 h-5 text-indigo-400 dark:text-indigo-300" />
                <span>contato@nexus.com</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 dark:text-slate-500">
                <Phone className="w-5 h-5 text-indigo-400 dark:text-indigo-300" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 dark:text-slate-500">
                <Clock className="w-5 h-5 text-indigo-400 dark:text-indigo-300" />
                <span>Seg - Sex, 9h às 18h</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400 dark:text-slate-500">
                <MapPin className="w-5 h-5 text-indigo-400 dark:text-indigo-300" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Direitos Autorais */}
        <div className="pt-8 mt-8 border-t border-slate-800 dark:border-slate-800/50 text-center">
          <p className="text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} Nexus. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}