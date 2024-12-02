import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiEye } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne a navegação quando clicar no botão
    setIsAddingToCart(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1500);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Não navega se o clique foi em um botão
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/produto/${product.id}`);
  };

  return (
    <div 
      className="group bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Imagem e Badge de Desconto */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Badges de desconto e novidade */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-semibold px-3 py-1 rounded-full
                           shadow-lg transform transition-transform duration-300 hover:scale-105">
              Novo
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-rose-600 dark:bg-rose-500 text-white text-sm font-semibold px-3 py-1 rounded-full
                           shadow-lg transform transition-transform duration-300 hover:scale-105">
              -{discountPercentage}%
            </span>
          )}
        </div>
        {/* Overlay escuro no hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      </div>

      {/* Conteúdo do Card */}
      <div className="flex flex-col flex-grow p-4">
        {/* Marca */}
        <span className="text-sm text-slate-900 dark:text-slate-100 font-medium mb-1 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {product.brand}
        </span>

        {/* Nome do Produto */}
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1 line-clamp-2 min-h-[3.5rem] transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-grow transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-200">
          {product.description}
        </p>

        {/* Preços */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 dark:text-slate-400 line-through group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors">
                {product.originalPrice.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium transition-colors duration-300 group-hover:text-green-500 dark:group-hover:text-green-300">
              Economize {(product.originalPrice - product.price).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {/* Ver Detalhes */}
          <button
            onClick={() => navigate(`/produto/${product.id}`)}
            className="flex-1 inline-flex items-center justify-center gap-1.5
                    text-indigo-600 dark:text-indigo-400
                    bg-indigo-50 dark:bg-indigo-900/30 
                    hover:bg-indigo-100 dark:hover:bg-indigo-900/50
                    active:bg-indigo-200 dark:active:bg-indigo-900/70
                    px-3 py-2 rounded-lg
                    text-sm font-medium
                    transform transition-all duration-200 ease-in-out
                    hover:scale-[1.02]
                    min-w-[120px] h-[38px]"
          >
            <span>Ver Detalhes</span>
            <FiEye className="w-4 h-4" />
          </button>

          {/* Adicionar ao Carrinho */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`flex-1 inline-flex items-center justify-center gap-1.5
                    px-3 py-2 rounded-lg
                    text-sm font-medium
                    transform transition-all duration-200 ease-in-out
                    hover:scale-[1.02]
                    min-w-[120px] h-[38px]
                    disabled:cursor-not-allowed
                    ${isAddingToCart 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
          >
            {isAddingToCart ? (
              <>
                <span>Adicionado!</span>
                <FiShoppingCart className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Adicionar</span>
                <FiShoppingCart className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
