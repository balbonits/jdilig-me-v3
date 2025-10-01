# State Management Documentation

## Overview
Using **Zustand** for global state management - a lightweight, TypeScript-first solution with minimal boilerplate.

## Architecture

### Store Location
`/src/store/index.ts`

### Store Structure
```typescript
interface AppState {
  // Theme management
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: Theme) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Accordion groups
  accordionGroups: Record<string, string | null>;
  setAccordionGroup: (groupName: string, itemId: string | null) => void;
}
```

## Usage Patterns

### 1. Accessing State
```tsx
import { useAppStore } from '@/store';

function Component() {
  const theme = useAppStore((state) => state.theme);
  const notifications = useAppStore((state) => state.notifications);

  return <div>{/* component content */}</div>;
}
```

### 2. Updating State
```tsx
function ThemeToggle() {
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <button onClick={() => setTheme('dark')}>
      Switch to Dark
    </button>
  );
}
```

### 3. Multiple Selectors
```tsx
function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore(
    (state) => ({
      sidebarOpen: state.sidebarOpen,
      toggleSidebar: state.toggleSidebar
    })
  );

  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      {/* sidebar content */}
    </aside>
  );
}
```

## State Slices

### Theme Management
Controls application theme with system preference support:

```tsx
// Get current theme
const theme = useAppStore((state) => state.theme);

// Set theme
const setTheme = useAppStore((state) => state.setTheme);
setTheme('dark'); // 'light' | 'dark' | 'system'
```

### Notifications System
Global notification management:

```tsx
// Add notification
const addNotification = useAppStore((state) => state.addNotification);
addNotification('Success!', 'success');

// Remove specific notification
const removeNotification = useAppStore((state) => state.removeNotification);
removeNotification('notif-id');

// Clear all
const clearNotifications = useAppStore((state) => state.clearNotifications);
clearNotifications();
```

### UI State
Managing UI components state:

```tsx
// Sidebar state
const sidebarOpen = useAppStore((state) => state.sidebarOpen);
const setSidebarOpen = useAppStore((state) => state.setSidebarOpen);
const toggleSidebar = useAppStore((state) => state.toggleSidebar);

// Accordion groups
const setAccordionGroup = useAppStore((state) => state.setAccordionGroup);
setAccordionGroup('faq', 'item-1'); // Opens item-1 in faq group
setAccordionGroup('faq', null); // Closes all in faq group
```

## Advanced Patterns

### 1. Computed Values
```tsx
const useUnreadCount = () => {
  return useAppStore((state) =>
    state.notifications.filter(n => !n.read).length
  );
};
```

### 2. Actions Composition
```tsx
const useNotificationActions = () => {
  const store = useAppStore();

  const showSuccess = (message: string) => {
    store.addNotification(message, 'success');
    setTimeout(() => {
      // Auto-dismiss after 5s
      const latest = store.notifications[store.notifications.length - 1];
      if (latest) store.removeNotification(latest.id);
    }, 5000);
  };

  return { showSuccess };
};
```

### 3. Persistence
```tsx
// Add persistence for theme preference
import { persist } from 'zustand/middleware';

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // ... state and actions
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ theme: state.theme }), // Only persist theme
    }
  )
);
```

### 4. DevTools Integration
Already configured with Redux DevTools:
```tsx
export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // ... state
    }),
    {
      name: 'app-store', // Shows in DevTools
    }
  )
);
```

## Best Practices

### 1. Selector Performance
```tsx
// ❌ Bad - causes unnecessary re-renders
const state = useAppStore();

// ✅ Good - only re-renders when specific value changes
const theme = useAppStore((state) => state.theme);
```

### 2. Action Grouping
```tsx
// Group related actions
interface NotificationActions {
  add: (message: string, type?: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}
```

### 3. Type Safety
```tsx
// Define types for all state slices
type Theme = 'light' | 'dark' | 'system';
type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  timestamp: number;
}
```

### 4. Testing
```tsx
// Reset store for tests
beforeEach(() => {
  useAppStore.setState({
    theme: 'system',
    notifications: [],
    sidebarOpen: false,
    accordionGroups: {}
  });
});
```

## Migration Guide

### From Redux
```tsx
// Redux
const theme = useSelector((state) => state.theme);
const dispatch = useDispatch();
dispatch(setTheme('dark'));

// Zustand
const theme = useAppStore((state) => state.theme);
const setTheme = useAppStore((state) => state.setTheme);
setTheme('dark');
```

### From Context API
```tsx
// Context
const { theme, setTheme } = useThemeContext();

// Zustand
const theme = useAppStore((state) => state.theme);
const setTheme = useAppStore((state) => state.setTheme);
```

## Performance Tips

1. **Use shallow comparison** for multiple values
2. **Split large stores** into smaller ones if needed
3. **Memoize computed values** with useMemo
4. **Use transient updates** for temporary UI state

## Future Enhancements

- [ ] Add middleware for logging
- [ ] Implement time-travel debugging
- [ ] Add state persistence
- [ ] Create separate stores for different domains
- [ ] Add optimistic updates for API calls