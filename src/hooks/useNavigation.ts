import { useNavigate as useRouterNavigate } from 'react-router-dom';

type Page = 'home' | 'shop' | 'about' | 'reviews' | 'contact';

export function useNavigation() {
  const navigate = useRouterNavigate();

  const navigateTo = (page: Page) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
  };

  return { navigateTo };
}