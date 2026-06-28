import "./css";

function Menu() {
  return (
    <>
      <header>
        <div>
          <h1>Acomaina</h1>
          <p className="mesa">Mesa 4 • Menú Digital</p>
        </div>

        <a href="/pedido" className="btn-pedido">
          🛒 Pedido
        </a>
      </header>

      <section className="categorias">
        <a href="#platos">Platos</a>
        <a href="#bebidas">Bebidas</a>
      </section>

      <section className="contenedor">
        <h2 className="titulo-seccion" id="platos">
          Platos
        </h2>

        {/* CARD 1 */}
        <div className="card">
          <img
            src="https://www.machupicchu.biz/imagenes/articulos/plato-lechon-al-horno.jpg"
            alt="Lechón"
          />

          <div className="info">
            <span className="categoria">Especialidad</span>

            <h2>Lechón al Horno</h2>

            <p>
              Acompañado con tallarín al horno y rocoto relleno.
            </p>

            <div className="precio">
              S/ 25.00
              <p className="tiempo">⏱ 20 min aprox.</p>
            </div>

            <div className="cantidad">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="agregar">
              Agregar al pedido
            </button>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="card">
          <img
            src="https://www.paulinacocina.net/wp-content/uploads/2024/05/cordero-lechal-al-horno-paulina-cocina-recetas-800x450.jpg"
            alt="Cordero"
          />

          <div className="info">
            <span className="categoria">Tradicional</span>

            <h2>Cordero al Horno</h2>

            <p>
              Carne jugosa acompañada de papas doradas.
            </p>

            <div className="precio">
              S/ 25.00
              <p className="tiempo">⏱ 25 min aprox.</p>
            </div>

            <div className="cantidad">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="agregar">
              Agregar al pedido
            </button>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="card">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.oam4MpaTPiVfb-PrJ6JrWAHaD_?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Pollo"
          />

          <div className="info">
            <span className="categoria">Favorito</span>

            <h2>Pollo al Horno</h2>

            <p>
              Pollo crocante acompañado con papas y ensalada.
            </p>

            <div className="precio">
              S/ 25.00
              <p className="tiempo">⏱ 15 min aprox.</p>
            </div>

            <div className="cantidad">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="agregar">
              Agregar al pedido
            </button>
          </div>
        </div>

        <h2 className="titulo-seccion" id="bebidas">
          Bebidas
        </h2>

        {/* CARD 4 */}
        <div className="card">
          <img
            src="https://seniorblue.pe/wp-content/uploads/2023/06/CERVEZA-PILZEN.jpg"
            alt="Pilsen"
          />

          <div className="info">
            <span className="categoria">Bebida</span>

            <h2>Cerveza Pilsen</h2>

            <p>
              Bebida helada ideal para acompañar tus platos.
            </p>

            <div className="precio">
              S/ 14.00
              <p className="tiempo">
                ⏱ Disponible al instante
              </p>
            </div>

            <div className="cantidad">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="agregar">
              Agregar al pedido
            </button>
          </div>
        </div>

        {/* CARD 5 */}
        <div className="card">
          <img
            src="https://amazonasfoods.com/cdn/shop/products/inca_300x300.jpg?v=1627937385"
            alt="Inka Cola"
          />

          <div className="info">
            <span className="categoria">Gaseosa</span>

            <h2>Inka Cola 1 Litro</h2>

            <p>
              Gaseosa helada ideal para acompañar tus comidas.
            </p>

            <div className="precio">
              S/ 8.00
            </div>

            <p className="tiempo">
              ⏱ Disponible al instante
            </p>

            <div className="cantidad">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="agregar">
              Agregar al pedido
            </button>
          </div>
        </div>

        {/* CARD 6 */}
        <div className="card">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.tr39KDNZel5xH-aVkptM1gHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Coca Cola"
          />

          <div className="info">
            <span className="categoria">Gaseosa</span>

            <h2>Coca Cola 2 Litros</h2>

            <p>
              Bebida fría perfecta para compartir en la mesa.
            </p>

            <div className="precio">
              S/ 15.00
            </div>

            <p className="tiempo">
              ⏱ Disponible al instante
            </p>

            <div className="cantidad">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>

            <button className="agregar">
              Agregar al pedido
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Menu;