import { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
  dialogTitle: string;
  dialogDescription?: string;
  modalTrigger?: ReactNode;
  children?: ReactNode | string;
  buttonConfirm?: ReactNode;
  buttonClose?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export const ModalDialog = ({
  open,
  onOpenChange,
  dialogDescription,
  dialogTitle,
  modalTrigger,
  children,
  buttonConfirm,
  buttonClose = "Cancel",
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogDescription>{dialogDescription}</DialogDescription>
      <DialogContent
        aria-describedby="modal-modal-description"
        className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <div className="grid flex-1 text-sm font-normal">{children}</div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{buttonClose}</Button>
          </DialogClose>
          <DialogClose asChild>{buttonConfirm}</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
