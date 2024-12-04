import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "João Silva",
    rating: 5,
    comment: "Excelente experiência de compra! Produtos de alta qualidade e entrega super rápida. O atendimento ao cliente é excepcional.",
    date: "2024-01-15",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Maria Santos",
    rating: 4,
    comment: "Muito satisfeita com as compras. A navegação no site é intuitiva e os preços são competitivos. Recomendo!",
    date: "2024-01-10",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    rating: 5,
    comment: "Ótimo custo-benefício e produtos originais. A entrega foi mais rápida do que o esperado. Voltarei a comprar com certeza!",
    date: "2024-01-05",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const CustomerReviews: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-slate-300 dark:text-slate-600'
        } transition-colors duration-300`}
      />
    ));
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto transition-colors duration-300">
            Veja as experiências reais de nossos clientes com a Nexus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                {/* Avatar e Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-indigo-500/20 dark:text-indigo-400/20 transition-colors duration-300" />
                </div>

                {/* Review */}
                <p className="text-slate-600 dark:text-slate-400 mb-4 transition-colors duration-300">
                  {review.comment}
                </p>

                {/* Date */}
                <div className="text-sm text-slate-500 dark:text-slate-500 transition-colors duration-300">
                  {new Date(review.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
