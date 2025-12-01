import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { HttpMethodSelector } from "@/entities/http/ui/method-selector";
import { Input } from "@/shared/ui/input";
import { Send } from "lucide-react";
import { HttpRequest, HttpResponse } from "../models";

interface HttpDialogProps {
  request: HttpRequest;
  response?: HttpResponse;
}

export const HttpDialog = ({ request, response }: HttpDialogProps) => {
  return (
    <Dialog open={true}>
      <DialogContent className="min-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Get User by ID</DialogTitle>
          <DialogDescription>
            Returns user details for a given user ID.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex gap-2">
            <HttpMethodSelector method={request.method} setMethod={() => {}} />
            <Input />
          </div>

          <div className="font-mono whitespace-pre-wrap bg-gray-100 p-4 rounded-md text-sm">
            {response?.body}
          </div>

          <Button size="sm" className="self-end">
            <Send /> Send Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
