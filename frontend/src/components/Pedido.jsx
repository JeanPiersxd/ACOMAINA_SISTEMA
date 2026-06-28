import "./Pedido.css";

function Pedido() {
  return (
    <>
      {/* HEADER */}
      <header>
        <div>
          <h1>Acomaina</h1>
          <p>Mesa 4 - Pedido Actual</p>
        </div>

        <a href="/" className="btn-volver">
          Volver al Menú
        </a>
      </header>

      {/* CONTENEDOR */}
      <section className="pedido-contenedor">
        {/* PRODUCTOS */}
        <div className="productos">
          <h2>Resumen del Pedido</h2>

          {/* ITEM 1 */}
          <div className="item">
            <img
              src="https://www.machupicchu.biz/imagenes/articulos/plato-lechon-al-horno.jpg"
              alt="Lechón"
            />

            <div className="detalle">
              <h3>Lechón al Horno</h3>

              <p>Cantidad: 2</p>

              <div className="controles">
                <button>-</button>
                <span>2</span>
                <button>+</button>
              </div>

              <button className="eliminar">
                Eliminar
              </button>
            </div>

            <div className="subtotal">
              S/ 50.00
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="item">
            <img
              src="https://seniorblue.pe/wp-content/uploads/2023/06/CERVEZA-PILZEN.jpg"
              alt="Pilsen"
            />

            <div className="detalle">
              <h3>Cerveza Pilsen</h3>

              <p>Cantidad: 1</p>

              <div className="controles">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              <button className="eliminar">
                Eliminar
              </button>
            </div>

            <div className="subtotal">
              S/ 15.00
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="item">
            <img
              src="https://www.paulinacocina.net/wp-content/uploads/2024/05/cordero-lechal-al-horno-paulina-cocina-recetas-800x450.jpg"
              alt="Cordero"
            />

            <div className="detalle">
              <h3>Cordero al Horno</h3>

              <p>Cantidad: 1</p>

              <div className="controles">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>

              <button className="eliminar">
                Eliminar
              </button>
            </div>

            <div className="subtotal">
              S/ 25.00
            </div>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="resumen">
          <h2>Total</h2>

          <div className="fila">
            <span>Productos</span>
            <span>5</span>
          </div>

          <div className="fila">
            <span>Subtotal</span>
            <span>S/ 90.00</span>
          </div>

          <div className="fila total">
            <span>Total</span>
            <span>S/ 90.00</span>
          </div>

          <button className="btn-enviar">
            Enviar Pedido
          </button>
        </div>
      </section>
    </>
  );
}

export default Pedido;