import { NonIdealState } from "@blueprintjs/core";
import {
  Component,
  ComponentType,
  ErrorInfo,
  PropsWithChildren,
  ReactNode,
} from "react";

export interface ErrorBoundaryProps {
  onErrorComponent?: ComponentType<{ error?: Error }>;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  { error?: Error; errorInfo?: ErrorInfo }
> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);
    this.state = {};
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }
  render(): ReactNode {
    if (this.state.error) {
      if (this.props.onErrorComponent) {
        const Component = this.props.onErrorComponent;
        return <Component error={this.state.error} />;
      }
      return (
        <>
          <NonIdealState title="Error" icon="error">
            <pre>{this.state.error?.message}</pre>
          </NonIdealState>
        </>
      );
    }
    return this.props.children;
  }
}
