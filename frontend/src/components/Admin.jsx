import { useState, useEffect } from "react";
import { getPedidos, actualizarEstadoPedido } from "../services/api"; 
import "./Admin.css";

function Admin() {
  const [pedidos, setPedidos] = useState([]);

  // 1. CARGAR DATOS EN TIEMPO REAL DESDE MYSQL
  const cargarPedidos = async () => {
    try {
      const data = await getPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  // 2. CONTROLADOR PARA LOS BOTONES DE CAMBIO DE ESTADO
  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await actualizarEstadoPedido(id, nuevoEstado);
      cargarPedidos(); // Recarga la data al toque para mover el pedido de sección
    } catch (error) {
      alert("No se pudo actualizar el estado en la base de datos.");
    }
  };

  // 3. FILTROS E INTELIGENCIA DE DATOS (REPORTE EN VIVO)
  const pedidosActivos = pedidos.filter(p => p.estado.toUpperCase() !== "ENTREGADO");
  const pedidosHistorial = pedidos.filter(p => p.estado.toUpperCase() === "ENTREGADO");

  const pendientes = pedidos.filter(p => p.estado.toUpperCase() === "PENDIENTE").length;
  const preparando = pedidos.filter(p => p.estado.toUpperCase() === "PREPARANDO").length;
  
  const totalVentas = pedidosHistorial.reduce((sum, p) => sum + Number(p.total), 0);

  const obtenerClaseTarjeta = (estado) => {
    const est = estado.toUpperCase();
    if (est === "PENDIENTE") return "pend";
    if (est === "PREPARANDO") return "prep";
    if (est === "ENTREGADO") return "entreg";
    return "";
  };

  const handleImprimirPrecuenta = (pedido) => {
    const ventanaImpresion = window.open("", "_blank", "width=400,height=600");
    
    if (!ventanaImpresion) {
      alert("¡Por favor, activa los permisos de ventanas emergentes (pop-ups) para imprimir!");
      return;
    }
    
    const horaTicket = pedido.fecha 
      ? new Date(pedido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      : "--:--";

    const filasPlatos = pedido.detallePedidos?.map(item => `
      <tr>
        <td style="text-align: center;">${item.cantidad}</td>
        <td>${item.producto?.nombre || `Producto #${item.productoId}`}</td>
        <td style="text-align: right;">S/ ${Number(item.subtotal || 0).toFixed(2)}</td>
      </tr>
      ${item.observacion ? `<tr><td></td><td style="font-size: 11px; font-style: italic;">(Obs: ${item.observacion})</td><td></td></tr>` : ''}
    `).join("") || "";

    ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Pre-cuenta - Mesa ${pedido.mesa_id || pedido.mesaId}</title>
          <style>
            @page { size: auto; margin: 0mm; }
            body { font-family: 'Courier New', monospace; padding: 20px; width: 280px; }
            .text-center { text-align: center; }
            .linea { border-top: 1px dashed #000; margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; }
            th { border-bottom: 1px dashed #000; padding-bottom: 5px; }
            .total { font-size: 16px; font-weight: bold; text-align: right; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="text-center">
            <h2 style="margin: 0; font-size: 18px;">ACOMAINA</h2>
            <p style="margin: 5px 0;">Pre-cuenta de Control</p>
            <p style="margin: 0; font-size: 12px;">Hora: ${horaTicket}</p>
            <h3 style="margin: 10px 0 0 0; font-size: 16px;">MESA: ${pedido.mesa_id || pedido.mesaId}</h3>
          </div>
          
          <div class="linea"></div>
          
          <table>
            <thead>
              <tr>
                <th style="width: 15%; text-align: center;">Cant</th>
                <th style="text-align: left;">Descripción</th>
                <th style="width: 30%; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${filasPlatos}
            </tbody>
          </table>
          
          <div class="linea"></div>
          
          <div class="total">
            TOTAL: S/ ${Number(pedido.total).toFixed(2)}
          </div>
          
          <div class="text-center" style="margin-top: 30px; font-size: 11px;">
            --- No válido como Comprobante ---
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 300);
            }
          </script>
        </body>
      </html>
    `);
    
    ventanaImpresion.document.close();
  };

  return (
    <div className="admin-layout-directo" style={{ padding: "30px", backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* ENCABEZADO Y CONTADORES RÁPIDOS */}
      <section className="top-bar" style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2.6rem", color: "#b91c1c", fontWeight: "bold", margin: 0 }}>Acomaina - Sistema Integrado</h1>
          <p style={{ color: "#555", margin: "5px 0 0 0" }}>Control unificado de Cocina, Caja e Historial General</p>
        </div>
        <div className="estado-general">
          <span className="activo"></span> Sistema Online
        </div>
      </section>

      <section className="resumen" style={{ marginBottom: "30px" }}>
        <div className="card-resumen">
          <h3>Pedidos en Cola (Pendientes)</h3>
          <p style={{ color: "#b91c1c" }}>{String(pendientes).padStart(2, '0')}</p>
        </div>
        <div className="card-resumen">
          <h3>En Cocina (Preparando)</h3>
          <p style={{ color: "#f59e0b" }}>{String(preparando).padStart(2, '0')}</p>
        </div>
        <div className="card-resumen">
          <h3>Mesas Atendidas Hoy</h3>
          <p style={{ color: "#10b981" }}>{String(pedidosHistorial.length).padStart(2, '0')}</p>
        </div>
        <div className="card-resumen">
          <h3>Caja Total (Ventas)</h3>
          <p style={{ fontWeight: "bold" }}>S/ {totalVentas.toFixed(2)}</p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECCIÓN 1: MONITOREO DE MESAS EN VIVO */}
      {/* ========================================================================= */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "40px" }}>
        <h2 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0 }}>🍽️ 1. Mesas y Comandas Activas</h2>
        <span style={{ fontSize: "0.9rem", backgroundColor: "#ef4444", color: "#fff", padding: "2px 8px", borderRadius: "10px", fontWeight: "bold" }}>{pedidosActivos.length} en curso</span>
      </div>
      <p style={{ color: "#666", marginBottom: "20px" }}>Pedidos que se están cocinando o están consumiendo en salón ahorita.</p>
      
      <section className="pedidos">
        {pedidosActivos.map((pedido) => (
          <div key={pedido.id} className={`pedido-card ${obtenerClaseTarjeta(pedido.estado)}`}>
            <div className="pedido-top">
              <h2>Mesa {pedido.mesa_id || pedido.mesaId}</h2>
              <span className={`estado ${pedido.estado.toLowerCase()}`}>{pedido.estado}</span>
            </div>
            
            <p className="hora">
              ⏱️ {pedido.fecha ? new Date(pedido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Reciente"}
            </p>

            <ul className="platos-lista" style={{ paddingLeft: "20px", margin: "15px 0" }}>
              {pedido.detallePedidos?.map((item, index) => (
                <li key={index} style={{ marginBottom: "6px", fontSize: "0.95rem" }}>
                  <strong>{item.cantidad}x</strong> {item.producto?.nombre || `Producto #${item.productoId}`} 
                  {item.observacion && <span style={{ display: "block", fontSize: "0.8rem", color: "#e11d48", fontStyle: "italic" }}>({item.observacion})</span>}
                </li>
              ))}
            </ul>

            <div className="total" style={{ borderTop: "1px dashed #ddd", paddingTop: "10px", fontWeight: "bold" }}>
              Total a Cobrar: S/ {Number(pedido.total).toFixed(2)}
            </div>
            
            <div className="acciones" style={{ marginTop: "15px" }}>
              {/* 🔌 EL BOTÓN QUE FALTABA CONECTAR CON TU ADMIN.CSS 🔌 */}
              <button className="btn-precuenta" onClick={() => handleImprimirPrecuenta(pedido)}>
                🖨️ Imprimir Cuenta
              </button>

              <button 
                className="btn-preparando"
                onClick={() => handleCambiarEstado(pedido.id, "PREPARANDO")}
                disabled={pedido.estado.toUpperCase() === "PREPARANDO"}
              >
                Mandar a Cocina
              </button>
              <button 
                className="btn-entregado"
                onClick={() => handleCambiarEstado(pedido.id, "ENTREGADO")}
                style={{ backgroundColor: "#10b981", color: "white" }}
              >
                Entregado y Cobrado
              </button>
            </div>
          </div>
        ))}

        {pedidosActivos.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", backgroundColor: "#f1f5f9", borderRadius: "8px" }}>
            <p style={{ color: "#64748b", margin: 0, fontSize: "1.1rem" }}>✨ Salón despejado. No hay pedidos activos en este instante.</p>
          </div>
        )}
      </section>

      <hr style={{ border: "0", height: "2px", background: "linear-gradient(to right, #b91c1c, #e2e8f0)", margin: "50px 0" }} />

      {/* ========================================================================= */}
      {/* SECCIÓN 2: HISTORIAL DE PEDIDOS CERRADOS */}
      {/* ========================================================================= */}
      <h2 style={{ fontSize: "1.8rem", color: "#1e293b", marginBottom: "10px" }}>📜 2. Historial de Comandas Cerradas</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Registro completo de los pedidos despachados y facturados el día de hoy.</p>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        {pedidosHistorial.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #cbd5e1", color: "#475569" }}>
                  <th style={{ padding: "12px" }}>ID Pedido</th>
                  <th style={{ padding: "12px" }}>Mesa</th>
                  <th style={{ padding: "12px" }}>Hora Despacho</th>
                  <th style={{ padding: "12px" }}>Ítems / Platos Consumidos</th>
                  <th style={{ padding: "12px" }}>Estado</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Total Pagado</th>
                </tr>
              </thead>
              <tbody>
                {pedidosHistorial.map((pedido) => (
                  <tr key={pedido.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px", fontWeight: "500" }}>#{String(pedido.id).padStart(4, '0')}</td>
                    <td style={{ padding: "12px" }}>Mesa {pedido.mesa_id || pedido.mesaId}</td>
                    <td style={{ padding: "12px" }}>
                      {pedido.fecha ? new Date(pedido.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <ul style={{ margin: 0, paddingLeft: "15px", fontSize: "0.9rem", color: "#334155" }}>
                        {pedido.detallePedidos?.map((item, idx) => (
                          <li key={idx}>
                            {item.cantidad}x {item.producto?.nombre || `Producto #${item.productoId}`}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" }}>
                        PAGADO
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "bold", color: "#0f172a" }}>
                      S/ {Number(pedido.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: "#94a3b8", textAlign: "center", margin: "20px 0" }}>Aún no se han cerrado ni cobrado pedidos el día de hoy.</p>
        )}
      </div>

      <hr style={{ border: "0", height: "2px", background: "linear-gradient(to right, #10b981, #e2e8f0)", margin: "50px 0" }} />

      {/* REPORTE DE VENTAS */}
      <h2 style={{ fontSize: "1.8rem", color: "#1e293b", marginBottom: "10px" }}>📊 3. Reporte de Rendimiento Económico</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Análisis simplificado de ingresos acumulados e historial de cierres diarios.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
        
        {/* BLOQUE IZQUIERDO: RESUMEN DE HOY */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderLeft: "5px solid #10b981" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#475569" }}>Cierre de Caja (Hoy)</h4>
            <p style={{ fontSize: "1.1rem", margin: "5px 0" }}>Ingresos Brutos: <strong style={{ color: "#10b981" }}>S/ {totalVentas.toFixed(2)}</strong></p>
            <p style={{ fontSize: "0.9rem", color: "#64748b" }}>* Suma exclusiva de comandas cobradas en el turno actual.</p>
          </div>

          <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderLeft: "5px solid #3b82f6" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#475569" }}>Flujo Operacional</h4>
            <p style={{ fontSize: "1rem", margin: "5px 0" }}>Pedidos Totales Procesados: <strong>{pedidos.length}</strong></p>
            <p style={{ fontSize: "1rem", margin: "5px 0" }}>Dinero en Mesas Activas: <strong style={{ color: "#b91c1c" }}>S/ {pedidosActivos.reduce((sum, p) => sum + Number(p.total), 0).toFixed(2)}</strong></p>
          </div>
        </div>

        {/* BLOQUE DERECHO: ACUMULADO POR DÍAS (NUEVO) */}
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <h4 style={{ margin: "0 0 5px 0", color: "#1e293b", fontSize: "1.1rem" }}>📅 Historial de Cierres por Día</h4>
          <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "0 0 15px 0" }}>Ventas totales agrupadas según el calendario.</p>
          
          <div style={{ maxHeight: "220px", overflowY: "auto" }}>
            <table className="tabla-dias">
              <thead>
                <tr>
                  <th>Fecha / Día</th>
                  <th style={{ textAlign: "right" }}>Total Vendido</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // LÓGICA EN VIVO: Agrupar pedidos del historial por año-mes-día
                  const ventasPorDia = {};
                  
                  pedidosHistorial.forEach(p => {
                    if (!p.fecha) return;
                    // Extraemos solo "YYYY-MM-DD" de la fecha original
                    const fechaKey = new Date(p.fecha).toISOString().split('T')[0];
                    ventasPorDia[fechaKey] = (ventasPorDia[fechaKey] || 0) + Number(p.total);
                  });

                  // Convertir el objeto a una lista ordenada por fecha descendente (más reciente arriba)
                  const diasOrdenados = Object.keys(ventasPorDia).sort((a, b) => b.localeCompare(a));

                  if (diasOrdenados.length === 0) {
                    return (
                      <tr>
                        <td colSpan="2" style={{ textAlign: "center", color: "#94a3b8", padding: "20px" }}>
                          No hay registros de días anteriores.
                        </td>
                      </tr>
                    );
                  }

                  return diasOrdenados.map(fecha => {
                    // Darle un formato amigable local (ej: "29 de junio")
                    const opciones = { weekday: 'long', day: 'numeric', month: 'short' };
                    const fechaFormateada = new Date(fecha + "T00:00:00").toLocaleDateString('es-PE', opciones);
                    
                    return (
                      <tr key={fecha}>
                        <td style={{ textTransform: "capitalize" }}>{fechaFormateada}</td>
                        <td style={{ textAlign: "right" }} className="txt-verde">S/ {ventasPorDia[fecha].toFixed(2)}</td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Admin;