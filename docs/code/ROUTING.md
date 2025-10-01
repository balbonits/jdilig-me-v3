# Routing Documentation

## Overview
Using **React Router v6** for client-side routing with type-safe route definitions and nested layouts.

## Router Configuration

### Main Router
**Location**: `/src/router/AppRouter.tsx`

```tsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      // Additional routes...
    ]
  }
]);
```

## Route Structure

### Current Routes
```
/                    # HomePage - Landing page
/about              # AboutPage - About section
```

### Planned Routes
```
/portfolio          # Portfolio showcase
/portfolio/:id      # Project detail
/ui                 # UI component showcase
/code               # Code philosophy
/resume             # Interactive resume
/contact            # Contact page
```

## Layout System

### RootLayout
Wraps all pages with common elements:
- Navigation header
- Footer
- Theme provider
- Error boundaries

```tsx
function RootLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  );
}
```

## Navigation Patterns

### 1. Link Component
```tsx
import { Link } from 'react-router-dom';

<Link to="/about" className="nav-link">
  About
</Link>
```

### 2. NavLink (with active state)
```tsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/portfolio"
  className={({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  Portfolio
</NavLink>
```

### 3. Programmatic Navigation
```tsx
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/portfolio');
    // or navigate(-1) for back
  };
}
```

### 4. Navigation with State
```tsx
navigate('/portfolio', {
  state: { from: 'homepage' }
});

// Access in target component
const location = useLocation();
const { from } = location.state || {};
```

## Route Parameters

### Dynamic Routes
```tsx
{
  path: 'portfolio/:projectId',
  element: <ProjectDetail />
}

// Access in component
import { useParams } from 'react-router-dom';

function ProjectDetail() {
  const { projectId } = useParams();
  // Use projectId to fetch data
}
```

### Query Parameters
```tsx
import { useSearchParams } from 'react-router-dom';

function FilteredList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter');

  const updateFilter = (value: string) => {
    setSearchParams({ filter: value });
  };
}
```

## Protected Routes

### Authentication Guard
```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Usage
{
  path: 'admin',
  element: (
    <ProtectedRoute>
      <AdminPanel />
    </ProtectedRoute>
  )
}
```

## Loading States

### Route-level Suspense
```tsx
import { lazy, Suspense } from 'react';

const Portfolio = lazy(() => import('@/pages/Portfolio'));

{
  path: 'portfolio',
  element: (
    <Suspense fallback={<LoadingSpinner />}>
      <Portfolio />
    </Suspense>
  )
}
```

### Data Loading
```tsx
// Using loader pattern (React Router v6.4+)
{
  path: 'portfolio/:id',
  element: <ProjectDetail />,
  loader: async ({ params }) => {
    return fetchProject(params.id);
  }
}

// In component
import { useLoaderData } from 'react-router-dom';

function ProjectDetail() {
  const project = useLoaderData();
}
```

## Error Handling

### Error Boundaries
```tsx
{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
    // routes
  ]
}
```

### 404 Handling
```tsx
{
  path: '*',
  element: <NotFoundPage />
}
```

## Navigation Guards

### Leave Confirmation
```tsx
import { useBlocker } from 'react-router-dom';

function FormPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges &&
      currentLocation.pathname !== nextLocation.pathname
  );

  // Show confirmation dialog when blocker.state === 'blocked'
}
```

## Breadcrumbs

### Implementation
```tsx
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={name}>{name}</span>
        ) : (
          <Link key={name} to={routeTo}>
            {name}
          </Link>
        );
      })}
    </nav>
  );
}
```

## SEO & Meta Tags

### Route-specific Meta
```tsx
import { Helmet } from 'react-helmet-async';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About - John Dilig</title>
        <meta name="description" content="Learn about John Dilig..." />
      </Helmet>
      {/* page content */}
    </>
  );
}
```

## Performance Optimizations

### 1. Route-based Code Splitting
```tsx
const routes = [
  {
    path: 'portfolio',
    lazy: () => import('./pages/Portfolio')
  }
];
```

### 2. Prefetching
```tsx
// Prefetch on hover
<Link
  to="/portfolio"
  onMouseEnter={() => prefetchRoute('/portfolio')}
>
  Portfolio
</Link>
```

### 3. Route Transitions
```tsx
import { useTransition } from 'react';

function RouteTransition() {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };
}
```

## Testing Routes

### Route Testing
```tsx
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

test('renders about page', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <AppRouter />
    </MemoryRouter>
  );
  // assertions
});
```

## Best Practices

1. **Use type-safe routes** - Define route constants
2. **Implement loading states** - For better UX
3. **Handle errors gracefully** - Error boundaries at route level
4. **Optimize with lazy loading** - Split code by route
5. **Add meta tags** - For SEO on each page
6. **Test navigation flows** - Ensure routes work correctly

## Future Enhancements

- [ ] Add route animations/transitions
- [ ] Implement route preloading
- [ ] Add analytics tracking
- [ ] Create route guards for future admin
- [ ] Add sitemap generation