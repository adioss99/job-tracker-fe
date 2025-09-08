import { TextCursorInput } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectList = [
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "hired",
    label: "Hired",
  },
  {
    value: "interview",
    label: "Interview",
  },
  {
    value: "test",
    label: "Test",
  },
];

export const StatusFormComponent = ({
  method,
}: {
  method: "add" | "update";
}) => {
  const [status, setStatus] = useState("");
  const [isOther, setIsOther] = useState(false);
  useEffect(() => {
    if (status === "other") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  }, [status]);
  const handleSubmit = () => {
    if (method === "add") {
      return;
    }
    if (method === "update") {
      return;
    }
  };
  return (
    <>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          {selectList.map((item) => (
            <SelectItem value={`${item.value}`}>{item.label}</SelectItem>
          ))}
          <SelectItem value="other">
            <TextCursorInput className="opacity-50" />
            Other
          </SelectItem>
        </SelectContent>
      </Select>
      {isOther && (
        <div className="mt-4">
          <label htmlFor="other-status">Other Status</label>
          <Input
            id="other-status"
            placeholder="Enter other status"
            type="text"
          />
        </div>
      )}
    </>
  );
};
