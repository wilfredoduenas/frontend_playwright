# frontend_playwright

Automatización de pruebas end-to-end utilizando Playwright y Cucumber con TypeScript, siguiendo principios SOLID y el patrón Page Object Model (POM).

## Requisitos previos
- Node.js >= 16.x
- npm >= 8.x
- Git

## Instalación
1. Clona el repositorio:
   ```sh
   git clone https://github.com/wilfredoduenas/frontend_playwright.git
   cd frontend_playwright
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```

## Configuración
- El archivo `cucumber.js` (o configuración en `package.json`) permite ejecutar escenarios por tags y define la integración con TypeScript:

```js
module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require step-definitions/**/*.ts',
    '--publish-quiet',
    'tests/features/**/*.feature'
  ]
};
```

## Estructura del proyecto
```
frontend_playwright/
├── package.json                # Dependencias y scripts
├── playwright.config.ts        # Configuración de Playwright
├── cucumber.js                 # Configuración de Cucumber (si existe)
├── src/
│   ├── interfaces/             # Interfaces TypeScript para páginas y servicios
│   │   └── ILoginPage.ts
│   ├── locators/               # Archivos de localizadores por página
│   │   ├── login.locator.ts
│   │   └── product.locator.ts
│   ├── pages/                  # Page Objects (POM)
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductPage.ts
│   │   └── CheckoutPage.ts
│   └── utils/                  # Utilidades y helpers
│       └── EvidenceHelper.ts
├── src/services/               # Servicios reutilizables (ej: AuthService)
│   └── auth.service.ts
├── step-definitions/           # Definiciones de pasos Cucumber
│   ├── login.step.ts
│   ├── product.step.ts
│   └── purchase.step.ts
├── tests/
│   ├── features/               # Archivos .feature con escenarios BDD
│   │   ├── login.feature
│   │   ├── product.feature
│   │   └── purchase.feature
│   └── ...
└── ...
```

## Ejecución de pruebas
- Ejecuta todos los escenarios:
  ```sh
  npx cucumber-js
  ```
- Ejecuta por tags (ejemplo):
  ```sh
  npx cucumber-js tests/features --tags "@login"
  npx cucumber-js tests/features --tags "@product and @smoke"
  npx cucumber-js tests/features --tags "@purchase"
  ```

## Buenas prácticas implementadas
- **SOLID**: Separación de responsabilidades en servicios, páginas y helpers.
- **POM**: Cada página tiene su propio objeto y localizadores.
- **Reutilización**: Servicios y helpers reutilizables en diferentes flujos.
- **Tags**: Permiten ejecutar escenarios específicos.
- **Interfaces**: Facilitan la extensión y el tipado estricto.
- **Organización**: Estructura clara y modular.

## Personalización
- Agrega nuevos Page Objects en `src/pages/` y sus localizadores en `src/locators/`.
- Crea nuevos servicios en `src/services/`.
- Añade nuevos escenarios en `tests/features/` y sus pasos en `step-definitions/`.

## Contacto
Para dudas o mejoras, abre un issue en el repositorio o contacta al propietario.
