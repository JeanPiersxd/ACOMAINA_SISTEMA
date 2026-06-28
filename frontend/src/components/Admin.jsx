import "./Admin.css";

function Admin() {
  return (
    <div className="admin-layout"> {/* <--- Cambiamos el fragmento <> por este div */}
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Acomaina</h2>

        <nav>
          <a href="#">Pedidos</a>
          <a href="#">Mesas</a>
          <a href="#">Historial</a>
          <a href="#">Reportes</a>
          <a href="#">Configuración</a>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="contenido">
        {/* TOP */}
        <section className="top-bar">
          <div>
            <h1>Panel de Pedidos</h1>
            <p>Control general del restaurante</p>
          </div>

          <div className="estado-general">
            <span className="activo"></span>
            Restaurante Activo
          </div>
        </section>

        {/* RESUMEN */}
        <section className="resumen">
          <div className="card-resumen">
            <h3>Pedidos Pendientes</h3>
            <p>08</p>
          </div>

          <div className="card-resumen">
            <h3>Mesas Ocupadas</h3>
            <p>12</p>
          </div>

          <div className="card-resumen">
            <h3>Ventas del Día</h3>
            <p>S/ 1,240</p>
          </div>

          <div className="card-resumen">
            <h3>Pedidos Entregados</h3>
            <p>34</p>
          </div>
        </section>

        {/* PEDIDOS */}
        <section className="pedidos">
          {/* PEDIDO 1 */}
          <div className="pedido-card pend">
            <div className="pedido-top">
              <h2>Mesa 4</h2>
              <span className="estado pendiente">Pendiente</span>
            </div>
            <p className="hora">8:42 PM</p>
            <ul>
              <li>2x Lechón al Horno</li>
              <li>1x Cerveza Pilsen</li>
              <li>1x Chicha Roja</li>
            </ul>
            <div className="total">Total: S/ 128.00</div>
            <div className="acciones">
              <button className="btn-preparando">Preparando</button>
              <button className="btn-entregado">Entregado</button>
            </div>
          </div>

          {/* PEDIDO 2 */}
          <div className="pedido-card prep">
            <div className="pedido-top">
              <h2>Mesa 2</h2>
              <span className="estado preparando">Preparando</span>
            </div>
            <p className="hora">8:55 PM</p>
            <ul>
              <li>1x Cordero al Horno</li>
              <li>2x Gaseosa Inka Cola</li>
            </ul>
            <div className="total">Total: S/ 96.00</div>
            <div className="acciones">
              <button className="btn-preparando">Preparando</button>
              <button className="btn-entregado">Entregado</button>
            </div>
          </div>

          {/* PEDIDO 3 */}
          <div className="pedido-card entreg">
            <div className="pedido-top">
              <h2>Mesa 7</h2>
              <span className="estado entregado">Entregado</span>
            </div>
            <p className="hora">9:10 PM</p>
            <ul>
              <li>1x Pollo al Horno</li>
              <li>1x Chicha Blanca</li>
            </ul>
            <div className="total">Total: S/ 52.00</div>
            <div className="acciones">
              <button className="btn-preparando">Preparando</button>
              <button className="btn-entregado">Entregado</button>
            </div>
          </div>
        </section>
      </main>

    </div> /* <--- Cerramos el contenedor .admin-layout aquí */
  );
}

export default Admin;