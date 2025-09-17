# FlowFi MVP - Concept UI

Este es el MVP conceptual de FlowFi, un protocolo DeFi modular que presenta una interfaz de usuario para demostrar la visión del producto a potenciales usuarios e inversores.

## 🌐 Sobre FlowFi

FlowFi es un protocolo DeFi modular con tres ramas principales de producto:

### 📈 Funds (Fondos)
- Fondos gestionados con TVL tokenizado
- Fees principales: Reward fee (~8%), Fee de revalorización (~2.5%), Premium anual opcional
- Genera ingresos recurrentes a partir de gestión pasiva de liquidez y yield

### 📦 Strategy Bundles (Bundles de Estrategias)
- Conjuntos de estrategias empaquetadas (similar a "recipes")
- Los usuarios pagan entry fee y profit fee por operar con bundles
- Diferenciación: sistema único, automatizado y conectado con chart interactivo propio

### 📊 DeFi Chart (Gráfico DeFi)
- Módulo de visualización avanzada con fees por uso
- Funciona como capa de datos + herramienta interactiva para usuarios y gestores

## 🚀 Características del MVP

- **Dashboard Principal**: Visión general del protocolo con estadísticas clave
- **Gestión de Funds**: Interfaz para crear, visualizar y gestionar fondos
- **Strategy Bundles**: Catálogo de estrategias empaquetadas con ejecución simplificada
- **DeFi Chart Interactivo**: Visualización avanzada con capacidades de trading directo
- **Datos Mockeados**: Simulación completa con datos realistas para demostración

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** como bundler y dev server
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Recharts** para visualizaciones de datos
- **Lucide React** para iconografía

## 📦 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build
npm run preview
```

## 🎯 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── Layout.tsx     # Layout principal con navegación
├── pages/             # Páginas principales
│   ├── Dashboard.tsx  # Dashboard principal
│   ├── Funds.tsx      # Gestión de fondos
│   ├── Strategies.tsx  # Strategy bundles
│   └── Chart.tsx      # DeFi chart interactivo
├── types/             # Definiciones TypeScript
│   └── index.ts       # Tipos principales
├── data/              # Datos mockeados
│   └── mockData.ts    # Datos de simulación
├── utils/              # Utilidades
└── styles/            # Estilos adicionales
```

## 🎨 Diseño y UX

El MVP está diseñado con un enfoque en:
- **Simplicidad**: Interfaz intuitiva que reduce la complejidad de DeFi
- **Visualización**: Gráficos interactivos para mejor comprensión
- **Modularidad**: Cada rama del producto es independiente pero integrada
- **Profesionalismo**: Diseño moderno y confiable para inversores

## 🔮 Roadmap

Este MVP corresponde a la **Fase 1: Concept MVP** del roadmap de FlowFi:
- Frontend simple mostrando la visión completa de la dApp
- Datos mockeados para visualizar flujos y UX propuestos
- Pruebas de concepto para equipo y primeros usuarios

## 📝 Notas de Desarrollo

- Todos los datos son simulados para propósitos de demostración
- La funcionalidad está limitada a visualización y navegación
- Diseñado para ser responsive y accesible
- Preparado para integración futura con contratos inteligentes

## 🤝 Contribución

Este es un MVP conceptual para demostración. Para contribuciones al desarrollo real del protocolo FlowFi, contacta con el equipo de desarrollo.