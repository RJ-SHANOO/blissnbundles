import { Component } from "react";

// Catches render/data errors anywhere below it (e.g. a failed Supabase
// fetch that throws) so one broken section shows a retry screen instead
// of a blank, unresponsive page for every visitor.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled UI error:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Something went wrong.
          </h1>
          <p className="max-w-sm text-muted">
            This section hit an unexpected error. Try again, or reload the
            page.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03]"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border-2 border-ink/25 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
