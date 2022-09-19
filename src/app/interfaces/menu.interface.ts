export interface MenuInterface {
    titulo: string,
    icono: string,
    submenu: {
        titulo: string;
        url: string;
    }[]
}