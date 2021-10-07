import { NbMenuItem } from '@nebular/theme';

var autorisation = localStorage.getItem("DETAILS_USER") == null ?null : JSON.parse(localStorage.getItem("DETAILS_USER")).type_user.type;
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    hidden:autorisation != "admin",
    data:{roles:['admin','technicien','comptable']},

  },
  {
    title: 'GESTION',
    group: true,
    hidden:autorisation != "admin",
    data:{roles:['admin','technicien','comptable']}
  },
  {
    title: 'Comptes',
    icon: 'people',
    link: '/pages/iot-dashboard',
    home: true,
    hidden:autorisation != "admin"
  },
  {
    title: 'Espace client',
    icon: 'people',
    hidden:autorisation != "admin",
    link:'/pages/espaceclient',
    data:{roles:['admin','technicien','comptable']}
  },
  {
    title: 'Espace boitier',
    icon: 'people',
    hidden:autorisation != "admin",
    link:'/pages/espaceboitier',
    data:{roles:['admin','technicien','comptable']}
  },
  {
    title: 'Espace de recherche',
    icon: 'people',
    hidden:autorisation != "admin",
    link:'/pages/listes',
    data:{roles:['admin','technicien','comptable']}
  },
 






   {
    title: 'Ticket',
    icon: 'alert-circle-outline',
    link: '/pages/iot-dashboard',
    hidden:autorisation != "admin"
  },
  {
    title: 'historique',
    icon: 'lock-outline',
    children: [
      {
        title: 'log',
        link: '/pages/historique/log',
        hidden:autorisation != "admin",
        data:{roles:['admin']}
      },
      {
        title: 'suivi_installation',
        link: '/pages/historique/suivi_installation',
        hidden:autorisation != "admin"
      },
    ],
  },
];
