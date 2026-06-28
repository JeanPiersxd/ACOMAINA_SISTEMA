-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS acomaina_db;
USE acomaina_db;

-- 2. Tabla de Categorías
CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- 3. Tabla de Productos
CREATE TABLE producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(255),
    estado TINYINT(1) DEFAULT 1, -- 1: Disponible, 0: Agotado
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE SET NULL
);

-- 4. Tabla de Mesas
CREATE TABLE mesa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    estado VARCHAR(50) DEFAULT 'Libre' -- 'Libre', 'Ocupada', 'Atendida'
);

-- 5. Tabla de Pedidos (Cabecera)
-- Aquí es donde el administrador filtra por "fecha" para sacar las cuentas del día
CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- <-- Solo cambiamos DATETIME por TIMESTAMP
    total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    estado VARCHAR(50) DEFAULT 'Pendiente', 
    mesa_id INT,
    FOREIGN KEY (mesa_id) REFERENCES mesa(id) ON DELETE SET NULL
);

-- 6. Tabla de Detalles del Pedido (El desglose)
-- Esta tabla une los pedidos con los productos comprados
CREATE TABLE detalle_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL, -- cantidad x precio del producto
    observacion VARCHAR(255), -- Ejemplo: "Sin cebolla", "Bien helada"
    FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

USE acomaina_db;

-- 1. Insertar las categorías
INSERT INTO categoria (nombre) VALUES 
('Platos de la Selva'),
('Platos de la Sierra'),
('Cervezas'),
('Bebidas sin Alcohol');

-- 2. Insertar los productos
INSERT INTO producto (nombre, descripcion, precio, imagen, categoria_id) VALUES
('Tacacho con Cecina', 'Delicioso platillo con plátano bellaco, manteca de chancho y cecina ahumada regional.', 35.00, 'tacacho.jpg', 1),
('Juane de Gallina', 'Tradicional juane de arroz sazonado con palillo, huevo, aceituna y presa de gallina.', 30.00, 'juane.jpg', 1),
('Pachamanca a la Olla', 'Tres carnes (cerdo, pollo, res) maceradas con chincho, huacatay y acompañamientos.', 38.00, 'pachamanca.jpg', 2),
('Caldo de Mote', 'Concentrado de mote con carne de res, mondongo y hierbas aromáticas.', 20.00, 'caldo_mote.jpg', 2),
('Cerveza San Juan (Personal)', 'La clásica chela de la selva bien helada.', 8.50, 'san_juan.jpg', 3),
('Cerveza Pilsen Trujillo', 'Botella personal bien helada.', 8.00, 'pilsen.jpg', 3),
('Gaseosa Coca Cola 500ml', 'botella de medio litro helada.', 4.50, 'coca_cola.jpg.jpg', 4),
('Gaseosa Coca Cola 2lt', 'botella de 2 litros bien helada.', 12.00, 'coca_cola2lt.jpg.jpg', 4),
('Chicha Morada Jarra', 'Preparada de forma natural con maíz morado, piña, manzana y limón.', 15.00, 'chicha_jarra.jpg', 4),
('Gaseosa Inca Kola 500ml', 'Botella de medio litro helada.', 4.50, 'inca_kola.jpg', 4),
('Gaseosa Inca Kola 2lt', 'Botella de 2 litro bien helada.', 12.00, 'inca_kola2lt.jpg', 4),
('Agua Mineral San Mateo', 'Con o sin gas.', 3.50, 'aguaSM.jpg', 4),
('Agua Mineral San Luis', 'Con o sin gas.', 3.50, 'aguaSL.jpg', 4);

-- 3. Insertar unas cuantas mesas iniciales para el restaurante
INSERT INTO mesa (numero, estado) VALUES 
(1, 'Libre'),
(2, 'Libre'),
(3, 'Libre'),
(4, 'Libre'),
(5, 'Libre'),
(6, 'Libre'), 
(7, 'Libre'),
(8, 'Libre'),
(9, 'Libre'),
(10, 'Libre');