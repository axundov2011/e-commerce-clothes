
// Men window.locationu ona gore verirem ki eger "http://localhost:5173/admin"le baslamirsa
// pathnameye baxiriq. Eger pathName/admin olaraq baslayirsa de ki bu bir admin sehifesidir, adminLayoutu goster
export const isAdmin = window.location.pathname.startsWith("/admin");;


