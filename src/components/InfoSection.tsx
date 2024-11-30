import React from 'react';
import { Truck, CreditCard, ShieldCheck, Package } from 'lucide-react';

export function InfoSection() {
  const features = [
    {
      name: 'Frete Grátis',
      description: 'Em todas as compras para todo o Brasil',
      icon: Truck,
    },
    {
      name: 'Pagamento Seguro',
      description: 'Cartão de crédito, boleto ou PIX',
      icon: CreditCard,
    },
    {
      name: 'Garantia de Qualidade',
      description: 'Produtos 100% originais e garantidos',
      icon: ShieldCheck,
    },
    {
      name: 'Entrega Rápida',
      description: 'Receba em até 7 dias úteis',
      icon: Package,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative group bg-slate-50 dark:bg-slate-800 rounded-2xl p-6
                         border border-slate-200 dark:border-slate-700
                         hover:border-indigo-600/50 dark:hover:border-indigo-400/50
                         transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 rounded-xl shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
