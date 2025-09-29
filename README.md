# jdilig-me-v3

A modern React.js/TypeScript project built with Vite, featuring a complete development stack with testing, styling, and component documentation.

![Application Screenshot](https://github.com/user-attachments/assets/8438c5f7-37ae-45de-94c0-c62e495d95a4)

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.13
- **Unit Testing**: Vitest 3.2.4 with Testing Library
- **E2E Testing**: Playwright 1.55.1
- **Component Documentation**: Storybook 9.1.8
- **Linting**: ESLint 9.36.0

## 📦 Features

- ⚡ Lightning-fast development with Vite HMR
- 🎨 Modern UI with Tailwind CSS utility classes
- 🧪 Comprehensive testing setup (unit + e2e)
- 📚 Interactive component documentation with Storybook
- 🔧 TypeScript for type safety
- 🎯 ESLint for code quality

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jdilig-me-v3
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing
- `npm run test` - Run unit tests in watch mode
- `npm run test:run` - Run unit tests once
- `npm run test:ui` - Open Vitest UI
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run test:e2e:ui` - Run Playwright tests with UI

### Code Quality
- `npm run lint` - Run ESLint

### Documentation
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── TailwindButton.tsx
│   └── TailwindButton.test.tsx
├── stories/            # Storybook stories
│   ├── TailwindButton.stories.ts
│   └── ...
├── test/               # Test configuration
│   └── setup.ts
├── App.tsx             # Main application component
├── App.test.tsx        # App component tests
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind directives

tests/                  # Playwright e2e tests
├── example.spec.ts
└── ...

.storybook/             # Storybook configuration
├── main.ts
└── preview.ts
```

## 🧪 Testing

### Unit Tests (Vitest)
Unit tests are configured with Vitest and Testing Library. Tests are co-located with components using the `.test.tsx` extension.

Example test:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TailwindButton } from './TailwindButton'

describe('TailwindButton', () => {
  it('renders children correctly', () => {
    render(<TailwindButton>Click me</TailwindButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### E2E Tests (Playwright)
End-to-end tests are located in the `tests/` directory and use Playwright to test the application in real browsers.

Example e2e test:
```typescript
import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Vite \+ React/)
})
```

## 🎨 Styling with Tailwind CSS

The project uses Tailwind CSS v4 with the new PostCSS plugin architecture. Tailwind directives are included in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Custom Component Example

```typescript
export function TailwindButton({ children, variant = 'primary' }: Props) {
  const baseClasses = 'font-medium rounded-lg focus:outline-none focus:ring-2'
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white'
  }
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  )
}
```

## 📚 Storybook

Storybook is configured to document and showcase components. Stories are located in `src/stories/` and use the `.stories.ts` extension.

Access Storybook at `http://localhost:6006` when running `npm run storybook`.

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration with Vitest setup
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration for Tailwind
- `playwright.config.ts` - Playwright test configuration
- `eslint.config.js` - ESLint configuration
- `tsconfig.json` - TypeScript configuration

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory and can be deployed to any static hosting service.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.