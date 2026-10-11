import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white text-gray-800">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-2xl mb-4">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <h1 className="text-xl font-bold mb-2">Algo correu mal</h1>
          <p className="text-sm text-gray-600 mb-4 max-w-md">
            Ocorreu um erro inesperado ao carregar esta página. Por favor, recarregue ou volte à página inicial.
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.href = '/';
            }}
            className="px-5 py-2.5 bg-[#0066ff] hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Voltar ao Início
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
