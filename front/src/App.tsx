

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-extrabold text-white mb-10 text-center drop-shadow-lg">
        Productos Destacados
      </h1>

      <div className="flex flex-wrap justify-center">
        {/* Primera tarjeta de producto */}
        {/* Si usas ProductCard.tsx, reemplaza el div de abajo con <ProductCard ... /> */}
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition-transform duration-300 hover:scale-105">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/400x250/FF6347/FFFFFF?text=Producto+1" // Imagen de ejemplo
            alt="Auriculares Inalámbricos"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-800">Auriculares Inalámbricos</div>
            <p className="text-gray-700 text-base">
              Disfruta de un sonido cristalino y comodidad durante todo el día.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-between items-center">
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">
              $99.99
            </span>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Segunda tarjeta de producto */}
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition-transform duration-300 hover:scale-105">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/400x250/4682B4/FFFFFF?text=Producto+2" // Imagen de ejemplo
            alt="Smartwatch Deportivo"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-800">Smartwatch Deportivo</div>
            <p className="text-gray-700 text-base">
              Monitoriza tu actividad física y recibe notificaciones.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-between items-center">
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">
              $149.99
            </span>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Tercera tarjeta de producto */}
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 transition-transform duration-300 hover:scale-105">
          <img
            className="w-full h-48 object-cover"
            src="https://via.placeholder.com/400x250/3CB371/FFFFFF?text=Producto+3" // Imagen de ejemplo
            alt="Teclado Mecánico RGB"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-gray-800">Teclado Mecánico RGB</div>
            <p className="text-gray-700 text-base">
              Experiencia de escritura superior con iluminación personalizable.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-between items-center">
            <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2">
              $79.99
            </span>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">
              Añadir al carrito
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;