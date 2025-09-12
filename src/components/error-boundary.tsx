import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Dialog open>
          <DialogContent
            className="max-w-md translate-y-10 mx-auto"
            style={{
              top: "5%",
              transform: "translate(-50%, 0)",
              left: "50%",
              position: "fixed",
            }}>
            <DialogHeader>
              <DialogTitle className="text-red-600">
                💥 Something went wrong
              </DialogTitle>
              <DialogDescription>
                {this.state.error?.message ||
                  "An unexpected error occurred. Please try again."}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex justify-end">
              <Button variant="destructive" onClick={this.handleReload}>
                Reload Page
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    }

    return this.props.children;
  }
}
