import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorPage from '@/components/site/ErrorPage';

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * Catches an error thrown while a page renders and shows a message in its
 * place, so a bug in one page doesn't blank the whole site. SiteLayout keys it
 * by navigation, so going to another page tries again.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    return this.state.failed ? <ErrorPage /> : this.props.children;
  }
}
