import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Colores para el dashboard
const COLORS = {
  recurrentes: '#2563eb',
  esporadicos: '#8b5cf6',
  light: {
    recurrentes: '#93c5fd',
    esporadicos: '#c4b5fd',
  },
  pie: ['#2563eb', '#8b5cf6', '#06b6d4', '#14b8a6', '#84cc16', '#eab308', '#f97316', '#ef4444']
};

function App() {
  // Estados para almacenar los datos
  const [cargando, setCargando] = useState(true);
  const [resumen, setResumen] = useState(null);
  const [datosPorMes, setDatosPorMes] = useState([]);
  const [filtroAnio, setFiltroAnio] = useState('todos');
  const [aniosDisponibles, setAniosDisponibles] = useState([]);

  // Cargar datos pre-procesados (simulando carga desde backend)
  useEffect(() => {
    // Datos de resumen
    const resumenData = {
      totalRecurrentes: 10224.28,
      totalEsporadicos: 103259.89,
      totalGeneral: 113484.17,
      cantidadRecurrentes: 27,
      cantidadEsporadicos: 299,
      cantidadTotal: 326
    };

    // Datos temporales pre-procesados
    const datosTemporal = [
      {"mes":"2023-11","mesFormateado":"Nov 2023","recurrentesCount":0,"recurrentesAmount":0,"esporadicosCount":2,"esporadicosAmount":671.9,"totalAmount":671.9,"totalCount":2},
      {"mes":"2023-12","mesFormateado":"Dic 2023","recurrentesCount":2,"recurrentesAmount":1552.72,"esporadicosCount":78,"esporadicosAmount":35294.96,"totalAmount":36847.68,"totalCount":80},
      {"mes":"2024-01","mesFormateado":"Ene 2024","recurrentesCount":1,"recurrentesAmount":642.22,"esporadicosCount":17,"esporadicosAmount":6590.27,"totalAmount":7232.49,"totalCount":18},
      {"mes":"2024-02","mesFormateado":"Feb 2024","recurrentesCount":1,"recurrentesAmount":277.42,"esporadicosCount":2,"esporadicosAmount":360.63,"totalAmount":638.05,"totalCount":3},
      {"mes":"2024-03","mesFormateado":"Mar 2024","recurrentesCount":1,"recurrentesAmount":192.96,"esporadicosCount":3,"esporadicosAmount":507.57,"totalAmount":700.53,"totalCount":4},
      {"mes":"2024-04","mesFormateado":"Abr 2024","recurrentesCount":1,"recurrentesAmount":1750,"esporadicosCount":4,"esporadicosAmount":2180,"totalAmount":3930,"totalCount":5},
      {"mes":"2024-05","mesFormateado":"May 2024","recurrentesCount":1,"recurrentesAmount":284.74,"esporadicosCount":17,"esporadicosAmount":1655.08,"totalAmount":1939.82,"totalCount":18},
      {"mes":"2024-06","mesFormateado":"Jun 2024","recurrentesCount":4,"recurrentesAmount":912.16,"esporadicosCount":10,"esporadicosAmount":1539.43,"totalAmount":2451.59,"totalCount":14},
      {"mes":"2024-07","mesFormateado":"Jul 2024","recurrentesCount":0,"recurrentesAmount":0,"esporadicosCount":4,"esporadicosAmount":1040.88,"totalAmount":1040.88,"totalCount":4},
      {"mes":"2024-08","mesFormateado":"Ago 2024","recurrentesCount":0,"recurrentesAmount":0,"esporadicosCount":6,"esporadicosAmount":6173.62,"totalAmount":6173.62,"totalCount":6},
      {"mes":"2024-09","mesFormateado":"Sep 2024","recurrentesCount":5,"recurrentesAmount":1061.66,"esporadicosCount":43,"esporadicosAmount":22994.11,"totalAmount":24055.77,"totalCount":48},
      {"mes":"2024-10","mesFormateado":"Oct 2024","recurrentesCount":0,"recurrentesAmount":0,"esporadicosCount":35,"esporadicosAmount":3688.5,"totalAmount":3688.5,"totalCount":35},
      {"mes":"2024-11","mesFormateado":"Nov 2024","recurrentesCount":4,"recurrentesAmount":530.84,"esporadicosCount":24,"esporadicosAmount":3594.62,"totalAmount":4125.46,"totalCount":28},
      {"mes":"2024-12","mesFormateado":"Dic 2024","recurrentesCount":2,"recurrentesAmount":2516.68,"esporadicosCount":38,"esporadicosAmount":14309.65,"totalAmount":16826.33,"totalCount":40},
      {"mes":"2025-01","mesFormateado":"Ene 2025","recurrentesCount":3,"recurrentesAmount":82.88,"esporadicosCount":11,"esporadicosAmount":2030.33,"totalAmount":2113.21,"totalCount":14},
      {"mes":"2025-02","mesFormateado":"Feb 2025","recurrentesCount":2,"recurrentesAmount":420,"esporadicosCount":5,"esporadicosAmount":628.34,"totalAmount":1048.34,"totalCount":7}
    ];
    
    // Simular tiempo de carga
    setTimeout(() => {
      setResumen(resumenData);
      setDatosPorMes(datosTemporal);
      setAniosDisponibles(["2023", "2024", "2025"]);
      setCargando(false);
    }, 1000);
  }, []);
  
  // Filtrar datos por año seleccionado
  const datosFiltrados = React.useMemo(() => {
    if (filtroAnio === 'todos') {
      return datosPorMes;
    }
    return datosPorMes.filter(item => item.mes.startsWith(filtroAnio));
  }, [datosPorMes, filtroAnio]);
  
  // Datos para gráfico de distribución
  const datosPie = React.useMemo(() => {
    if (!resumen) return [];
    return [
      { name: 'Recurrentes', valor: resumen.totalRecurrentes },
      { name: 'Esporádicos', valor: resumen.totalEsporadicos }
    ];
  }, [resumen]);
  
  // Renderizado condicional durante la carga
  if (cargando) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-4 text-xl font-semibold">Cargando datos...</div>
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard de Donaciones</h1>
        <p className="text-gray-600">Análisis de donaciones recurrentes y esporádicas</p>
        <p className="text-gray-500 text-sm mt-1">Organización de Apoyo a Inmigrantes en Nueva York</p>
      </div>
      
      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="anio" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por año:
            </label>
            <select
              id="anio"
              value={filtroAnio}
              onChange={(e) => setFiltroAnio(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los años</option>
              {aniosDisponibles.map(anio => (
                <option key={anio} value={anio}>{anio}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tarjetas de resumen */}
      {resumen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Donaciones</h3>
            <p className="text-3xl font-bold text-gray-900">${resumen.totalGeneral.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-500 mt-2">De {resumen.cantidadTotal} donadores</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Donadores Recurrentes</h3>
            <p className="text-3xl font-bold text-blue-600">${resumen.totalRecurrentes.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-500 mt-2">{resumen.cantidadRecurrentes} donadores ({((resumen.cantidadRecurrentes / resumen.cantidadTotal) * 100).toFixed(1)}%)</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Donadores Esporádicos</h3>
            <p className="text-3xl font-bold text-purple-600">${resumen.totalEsporadicos.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-500 mt-2">{resumen.cantidadEsporadicos} donadores ({((resumen.cantidadEsporadicos / resumen.cantidadTotal) * 100).toFixed(1)}%)</p>
          </div>
        </div>
      )}
      
      {/* Gráfico de distribución de montos */}
      <div className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución de Donaciones</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosPie}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {datosPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.pie[index % COLORS.pie.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Gráficos de tendencias temporales */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Gráfico de montos por mes */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tendencia de Donaciones por Mes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={datosFiltrados}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mesFormateado" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="recurrentesAmount"
                  name="Recurrentes"
                  stroke={COLORS.recurrentes}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="esporadicosAmount"
                  name="Esporádicos"
                  stroke={COLORS.esporadicos}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Gráfico de cantidad de donaciones por mes */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Número de Donaciones por Mes</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosFiltrados}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mesFormateado" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="recurrentesCount" name="Recurrentes" fill={COLORS.recurrentes} />
                <Bar dataKey="esporadicosCount" name="Esporádicos" fill={COLORS.esporadicos} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 mb-4">
        © 2025 Dashboard de Análisis de Donaciones | Última actualización: Febrero 2025
      </div>
    </div>
  );
}

export default App;